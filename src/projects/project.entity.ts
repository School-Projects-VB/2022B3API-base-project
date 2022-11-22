import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {User} from '../users/user.entity';
import {IsOptional} from "class-validator";

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({nullable: true})
    @IsOptional()
    description?: string;

    @OneToMany(type => User, user => user.id)
    referringEmployeeId!: string;
}
