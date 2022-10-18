import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'; 
import { User } from '../users/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @OneToMany(type => User, user => user.id)
  referringEmployeeId!: string;
}
