import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project.entity';
import {CreateProjectDto} from "../dto/createproject.dto";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: string): Promise<Project | undefined> {
    const project = await this.projectsRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException();
    }
    
    return project;
  }

  createProject(body: CreateProjectDto): Promise<Project> {
    return this.projectsRepository.save(this.projectsRepository.create(body));
  }
}
