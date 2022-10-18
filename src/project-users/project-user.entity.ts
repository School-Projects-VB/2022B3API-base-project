import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'; 

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column('uuid')
  projectId!: string;

  @Column('uuid')
  userId!: string;
}
