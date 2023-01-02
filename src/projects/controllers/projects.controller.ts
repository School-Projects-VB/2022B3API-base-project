import {
    Controller,
    Get,
    Post,
    Param,
    ParseUUIDPipe,
    UseGuards,
    Body,
    UsePipes,
    ValidationPipe,
    Req, UnauthorizedException,
} from '@nestjs/common';
import {ProjectsService} from '../services/projects.service';
import {Project} from '../project.entity';
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {CreateProjectDto} from "../dto/createproject.dto";
import {UsersService} from "../../users/services/users.service";

@Controller('projects')
export class ProjectsController {
    constructor(
        private projectsService: ProjectsService,
        private usersService: UsersService
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async createNew(@Req() req, @Body() dto: CreateProjectDto) {
        if (req.user.role !== "Admin") throw new UnauthorizedException();
        const project = await this.projectsService.createProject(dto);
        const user = await this.usersService.findOne(project.referringEmployeeId);
        return {project, user};
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(): Promise<Project[]> {
        return this.projectsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Project | undefined> {
        return this.projectsService.findOne(id);
    }
}
