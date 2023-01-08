import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Request, UseGuards, Param, ClassSerializerInterceptor, UseInterceptors, ParseUUIDPipe, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../user.entity';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.findUserByUsername(req.user.username);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User | undefined> {
    return this.usersService.findOne(id);
  }

  @Post('auth/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() dto: UserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  @Post('auth/login')
  async login(@Body() body) {
    let user = await this.usersService.findOneByEmail(body.email);

    if (user.password !== body.password) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: "Something is incorrect",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.authService.login(user);
  }
}
