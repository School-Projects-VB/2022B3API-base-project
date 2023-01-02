import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>
    ) {
    }

    public async findAll(): Promise<Project[]> {
        return await this.projectsRepository.find();
    }

    public async findAllByUser(id): Promise<Project[]> {
        return await this.projectsRepository.find({ where: { referringEmployeeId: id }, relations: ["referringEmployee"] });
    }

    public async findOne(id: string): Promise<Project | undefined> {
        return await this.projectsRepository.findOneBy({ id });
    }

    public async create(project: Project): Promise<Project> {
        this.projectsRepository.create(project);
        return this.projectsRepository.save(project);
    }
}
