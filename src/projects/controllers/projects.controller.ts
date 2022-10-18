import { Controller, Get, Post, Param, ParseUUIDPipe} from '@nestjs/common';
import { Project } from '../project.entity';

@Controller('projects')
export class ProjectsController {
  constructor() {}

  @Post()


  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return
  }
}
