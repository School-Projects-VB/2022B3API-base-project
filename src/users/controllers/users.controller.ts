import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Request, UseGuards, Param, ClassSerializerInterceptor, UseInterceptors} from '@nestjs/common';
import { User } from '../user.entity';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/createuser.dto';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoginUserDto } from '../dto/loginuser.dto';

import { AuthService } from '../../auth/services/auth.service';


@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() id): Promise<User | undefined> {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  // TODO: Login
  @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async logIn(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto);
  }
}
