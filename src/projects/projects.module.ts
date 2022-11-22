import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProjectsController} from './controllers/projects.controller';
import {ProjectsService} from './services/projects.service';
import {Project} from './project.entity';
import {User} from "../users/user.entity";
import {UsersService} from "../users/services/users.service";

@Module({
    imports: [TypeOrmModule.forFeature([Project, User])],
    controllers: [ProjectsController],
    providers: [ProjectsService, UsersService],
    exports: [ProjectsService],
})

export class ProjectsModule {}
