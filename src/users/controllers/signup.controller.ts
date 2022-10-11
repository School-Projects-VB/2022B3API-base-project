import { Controller, Post } from '@nestjs/common';

@Controller('/users/auth/sign-up')
export class SignUpController {
  @Post()
  test(): string {
    return 'test';
  }
}
