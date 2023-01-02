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

  @Column({ type: "uuid", nullable: false })
  projectId!: string;

  @Column({ type: "uuid", nullable: false })
  userId!: string;

  @OneToMany(type=>Project, project => project.id)
  project!: Project;

  @OneToMany(type=>User, user => user.id)
  user!: User;
}
