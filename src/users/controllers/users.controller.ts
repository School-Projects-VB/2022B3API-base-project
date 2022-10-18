import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Request, UseGuards, Param, ClassSerializerInterceptor, UseInterceptors, ParseUUIDPipe} from '@nestjs/common';
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
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User | undefined> {
    return this.usersService.findOne(id);
  }

  @Post('auth/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async logIn(@Body() loginUserDto: LoginUserDto){
    return await this.authService.login(loginUserDto);
  }
}
