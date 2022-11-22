import { Controller, Get, Post, Param, ParseUUIDPipe} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(
      private projectsService: ProjectsService
  ) {}

  @Post()
  create() {
    return
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Project | undefined> {
    return this.projectsService.findOne(id);
  }
}
