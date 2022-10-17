import { IsEmail, IsIn, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsOptional()
  @ApiProperty()
  @IsIn(['Employee', 'Admin', 'ProjectManager'])
  role: 'Employee' | 'Admin' | 'ProjectManager';
}
