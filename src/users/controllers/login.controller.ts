import { Controller, Post } from '@nestjs/common';

@Controller('/users/auth/login')
export class LoginController {
  @Post()
  test(): string {
    return 'test';
  }
}
