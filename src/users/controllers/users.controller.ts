import { Body, Controller, Get, Req, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from '../user.entity';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/createuser.dto';

@Controller('/users')
export class UsersController {
  constructor(private UsersService: UsersService) { }

  @Post('/auth/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() Param: CreateUserDto): string {
    return 'foo';
  }

  @Post('/auth/login')
  login(): string {
    return 'test';
  }

  @Get('/')
  async findAll(): Promise<User[]> {
    return this.UsersService.findAll();
  }

  @Get('/users/:id')
  findOne(): string {
    return 'return one user by id';
  }

  @Get('/users/me')
  async findMe(): Promise<String[]> {
    return this.UsersService.findMe();
  }
}
