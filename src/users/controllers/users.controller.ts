import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Request, UseGuards, Param} from '@nestjs/common';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { User } from '../user.entity';
import { UsersService } from '../services/users.service';
import { SignUpDto } from '../dto/signup.dto';



@Controller('/users')
export class UsersController {
  constructor(private UsersService: UsersService) { }

  // TODO
  @Post('/auth/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() Param: SignUpDto): boolean {
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
  @Get('/:id')
  findOne(@Param() id): Promise<User | undefined> {
    return this.UsersService.findOne(id);
  }

  // TODO
  @Get('/me')
  async findMe(): Promise<User[]> {
    return this.UsersService.findMe();
  }
}
