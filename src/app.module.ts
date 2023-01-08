/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './users/user.entity'; 
import { UsersModule } from './users/users.module';
import { Project } from './projects/project.entity';
import { ProjectUsersModule } from './project-users/project-users.module';
import { ProjectUser } from './project-users/project-users.entity';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    ProjectUsersModule,
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Project, ProjectUser, Event],
        synchronize: true,
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}
