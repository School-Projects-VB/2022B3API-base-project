import { IsEmail, IsIn, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsIn(['Employee', 'Admin', 'ProjectManager'])
  role: string;
}
