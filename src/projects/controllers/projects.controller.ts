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
    UnauthorizedException,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../project.entity';
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { CreateProjectDto } from "../dto/createproject.dto";
import { UsersService } from "../../users/services/users.service";
import { roles } from '../../auth/roles.enum';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller('projects')
export class ProjectsController {
    constructor(
        private projectsService: ProjectsService,
        private usersService: UsersService
    ) {
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(ValidationPipe)
    @Roles(roles.Admin)
    async createProject(@Body() body: CreateProjectDto): Promise<Project> {
        const referringEmployee = await this.usersService.findOne(body.referringEmployeeId);

        if (referringEmployee.role === roles.Employee) {
            throw new UnauthorizedException("Reffering employee must be a project manager");
        }

        const project = new Project();
        project.name = body.name;
        project.referringEmployee = referringEmployee;
        return await this.projectsService.create(project);
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
