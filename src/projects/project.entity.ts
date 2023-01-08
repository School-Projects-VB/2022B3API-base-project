import {Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne} from 'typeorm';
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

    @OneToOne(() => User, (user) => user.id)
    referringEmployeeId!: string;

    @ManyToOne(() => User, user => user.projects)
    referringEmployee !: User;
}
