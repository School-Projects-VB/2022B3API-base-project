import { Body, ClassSerializerInterceptor, ConflictException, Controller, ForbiddenException, Get, HttpException, HttpStatus, NotFoundException, Post, Query, Req, UnauthorizedException, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "../../users/services/users.service";
import { ProjectsService } from "../../projects/services/projects.service";
import { ProjectUsersService } from "../services/project-users.service";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { ProjectUser } from "../project-users.entity";

@Controller('project-users')
export class ProjectUsersController {
    constructor(
        private usersService: UsersService,
        private projectsService: ProjectsService,
        private projectUserService: ProjectUsersService
    ) { }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async findAll(@Req() req) {
        let projects = await this.projectUserService.findAllProjectUsers();
        let user = await this.usersService.findOne(req.user.id);

        if (user.role === "Employee") {
            let userProjects = this.projectUserService.findOneUser(user);
            return userProjects;
        }

        if (!projects) {
            return [];
        }

        return projects;
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async findOne(@Req() req, @Query("projectId") projectId: string) {
        let project = await this.projectsService.findOne(projectId);
        let requester = await this.usersService.findOne(req.user.id);

        if (requester.role === "Employee" && project.referringEmployeeId !== requester.id) {
            throw new ForbiddenException("Not Authorized");
        }

        if (!project) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: "Not found",
                },
                HttpStatus.NOT_FOUND,
            );
        }

        return project;
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    async createProjectUser(@Body() body, @Req() req) {
        let user = await this.usersService.findOne(req.user.id);
        let project = await this.projectsService.findOne(body.projectId);
        let refUser = await this.usersService.findOne(body.userId);

        if (user.role === "Employee") throw new UnauthorizedException("Not Authorized");

        if (!project) throw new NotFoundException("Not found");
        if (!refUser) throw new NotFoundException("Not found");

        let currentProjects = await this.projectUserService.findOneUser(refUser);
        for (let i = 0; i < currentProjects.length; i++) {
            if (currentProjects[i].startDate <= body.startDate && currentProjects[i].endDate >= body.startDate) {
                this.callConflict();
            }
            if (currentProjects[i].startDate <= body.endDate && currentProjects[i].endDate >= body.endDate) {
                this.callConflict();
            }
        }

        let projectUser = new ProjectUser();
        projectUser.startDate = body.startDate;
        projectUser.endDate = body.endDate;
        projectUser.projectId = project.id;
        projectUser.userId = refUser.id;

        return this.projectUserService.create(projectUser);
    }

    private callConflict() {
        throw new ConflictException("There is a conflict");
    }
}
