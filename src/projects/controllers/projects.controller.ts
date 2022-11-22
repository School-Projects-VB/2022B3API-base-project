import {Controller, Get, Post, Param, ParseUUIDPipe, UseGuards, } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../project.entity';
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {LocalAuthGuard} from "../../auth/guards/local-auth.guard";
import {RolesGuard} from "../../auth/guards/roles.guard";
// import {Roles} from "../../auth/decorators/roles.decorator";

@Controller('projects')
@UseGuards(RolesGuard)
export class ProjectsController {
  constructor(
      private projectsService: ProjectsService
  ) {}

  @Post()
  // @Roles('Employee')
  @UseGuards(JwtAuthGuard)
  create() {
    this.projectsService.createProject();
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @UseGuards(LocalAuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Project | undefined> {
    return this.projectsService.findOne(id);
  }
}
