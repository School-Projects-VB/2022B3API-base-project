import {IsNotEmpty} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import {Optional} from "@nestjs/common";

export class CreateProjectDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Optional()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  referringEmployeeId: string;
}
