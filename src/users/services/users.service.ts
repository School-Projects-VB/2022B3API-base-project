import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  john: User = new User('john', 'test.test@t.fr', 'f0o', 'Employee');
  maria: User = new User('john', 'test.test@t.fr', 'f0o', 'Employee');

  users: User[] = [this.john, this.maria];


  // TODO
  signUp(): boolean {
    return true;
  }

  // TODO
  login(): boolean {
    return true;
  }

  // TODO
  findAll(): User[] {
    return this.users;
  }

  // TODO
  findOne(): boolean {
    return true;
  }

  // TODO
  findMe(): User[] {
    return this.users;
  }
}
