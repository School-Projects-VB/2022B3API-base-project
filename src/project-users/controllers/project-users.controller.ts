import {Controller, Get, Post} from "@nestjs/common";
import {UsersService} from "../../users/services/users.service";
import {ProjectsService} from "../../projects/services/projects.service";

@Controller('project-users')
export class ProjectUsersController {
    constructor(
        private usersService: UsersService,
        private projectsService: ProjectsService,
    ) {}

    // TODO

    @Get()
    findAll(id) {
        return
    }

    @Get(':id')
    findOne() {
        return
    }

    @Post()
    assignTo()  {
        return
    }
}