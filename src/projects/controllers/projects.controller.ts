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
import { ProjectsService } from '../services/projects.service';
import { Project } from '../project.entity';
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { CreateProjectDto } from "../dto/createproject.dto";
import { UsersService } from "../../users/services/users.service";
import { roles } from '../../auth/roles.enum';

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
    async createProject(@Req() req, @Body() body: CreateProjectDto) {
        // if (req.user.role !== roles.Admin) throw new UnauthorizedException();
        const referringEmployee = await this.usersService.findOne(body.referringEmployeeId);

        if (referringEmployee.role === roles.Employee) {
            throw new UnauthorizedException("Reffering employee must be a project manager");
        }

        const project = new Project();
        project.name = body.name;
        project.referringEmployee = referringEmployee;
        return await this.projectsService.createProject(project);
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
