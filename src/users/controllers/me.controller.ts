import { Controller, Get } from '@nestjs/common';

@Controller('/users/me')
export class MeController {
  @Get()
  findMe(): string {
    return 'return active user';
  }
}
