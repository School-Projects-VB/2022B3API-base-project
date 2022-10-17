import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Request, UseGuards, Param, ClassSerializerInterceptor, UseInterceptors} from '@nestjs/common';
import { User } from '../user.entity';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/user.dto';


@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private UsersService: UsersService) { }

  @Get()
  async findAll(): Promise<User[]> {
    return this.UsersService.findAll();
  }

  @Get(':id')
  findOne(@Param() id): Promise<User | undefined> {
    return this.UsersService.findOne(id);
  }

  @Get('me')
  async findMe(): Promise<User[]> {
    // return this.UsersService.findMe();
    return;
  }

  @Post('auth/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.UsersService.createUser(createUserDto);
  }

  // TODO: Login
}
