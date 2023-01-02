import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProjectUser } from '../project-users/project-users.entity';
import { Project } from '../projects/project.entity';
import { roles } from "../auth/roles.enum"

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  @Column({ default: roles.Employee, nullable: false })
  role!: roles

  @OneToMany(() => Project, project => project.referringEmployee, { cascade: true })
  projects!: Project[];

  @OneToMany(type => ProjectUser, projectUser => projectUser.user)
  projectUser!: ProjectUser;
}
