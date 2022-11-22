import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Project} from "../projects/project.entity";
import {User} from "../users/user.entity";

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @OneToMany(type=>Project, project => project.id)
  projectId!: string;

  @OneToMany(type=>User, user => user.id)
  userId!: string;
}
