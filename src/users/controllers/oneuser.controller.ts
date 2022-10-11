import { Controller, Get } from '@nestjs/common';

@Controller('/users/:id')
export class OneUserController {
  @Get()
  findOne(): string {
    return 'return one user by id';
  }
}
