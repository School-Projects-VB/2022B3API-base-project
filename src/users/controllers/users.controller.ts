import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Request, UseGuards} from '@nestjs/common';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { User } from '../user.entity';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/createuser.dto';



@Controller('/users')
export class UsersController {
  constructor(private UsersService: UsersService) { }

  @Post('/auth/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() Param: CreateUserDto): boolean {
    return true;
  }

  // TODO: A tester
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  // TODO
  @Get('/')
  async findAll(): Promise<User[]> {
    return this.UsersService.findAll();
  }

  // TODO
  @Get('/users/:id')
  findOne(): string {
    return 'return one user by id';
  }

  // TODO
  @Get('/users/me')
  async findMe(): Promise<User[]> {
    return this.UsersService.findMe();
  }
}
