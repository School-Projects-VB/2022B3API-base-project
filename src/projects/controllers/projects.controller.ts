import {Controller, Get, Post, Param, ParseUUIDPipe, UseGuards} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../project.entity';
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {LocalAuthGuard} from "../../auth/guards/local-auth.guard";

@Controller('projects')
export class ProjectsController {
  constructor(
      private projectsService: ProjectsService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create() {
    this.projectsService.create();
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
