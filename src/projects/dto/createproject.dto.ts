import {IsNotEmpty, IsOptional, MinLength} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {

  id: string;

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  referringEmployeeId: string;
}
