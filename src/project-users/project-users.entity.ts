import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {Project} from "../projects/project.entity";
import {User} from "../users/user.entity";

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: "date", nullable: false })
  startDate!: Date;

  @Column({ type: "date", nullable: false })
  endDate!: Date;

  @ManyToOne(()=>Project, project => project.id)
  project!: Project;

  @ManyToOne(()=>User, user => user.id)
  user!: User;

  @Column({ type: "uuid", nullable: false })
  projectId!: string;

  @Column({ type: "uuid", nullable: false })
  userId!: string;
}
