import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../users/user.entity";
import { ProjectUser } from "../project-users.entity";

@Injectable()
export class ProjectUsersService {
  constructor(
    @InjectRepository(ProjectUser)
    private projectUsersRepository: Repository<ProjectUser>,
  ) {}

  findOneUser(user: User): Promise<ProjectUser[]> {
    return this.projectUsersRepository.find({ where : { user }});
  }

  findAllProjectUsers(): Promise<ProjectUser[]> {
    return this.projectUsersRepository.find();
  }
}
