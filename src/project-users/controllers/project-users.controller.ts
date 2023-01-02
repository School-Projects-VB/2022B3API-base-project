import { ClassSerializerInterceptor, Controller, ForbiddenException, Get, HttpException, HttpStatus, Post, Query, Req, UseInterceptors } from "@nestjs/common";
import { UsersService } from "../../users/services/users.service";
import { ProjectsService } from "../../projects/services/projects.service";
import { ProjectUsersService } from "../services/project-users.service";

@Controller('project-users')
export class ProjectUsersController {
    constructor(
        private usersService: UsersService,
        private projectsService: ProjectsService,
        private projectUserService: ProjectUsersService
    ) { }

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

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    async findOne(@Req() req, @Query("projectId") projectId: string) {
        let project = await this.projectsService.findOne(projectId);
        let requester = await this.usersService.findOne(req.user.id);

        if (requester.role === "Employee" && project.referringEmployeeId !== requester.id) {
            throw new ForbiddenException("you are not authorized to view this project");
        }

        if (!project) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: "project not found",
                },
                HttpStatus.NOT_FOUND,
            );
        }

        return project;
    }

    @Post()
    assignTo() {
        return
    }
}
