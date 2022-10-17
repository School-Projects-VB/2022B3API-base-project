import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  
  // DataFixtures
  john: User = new User('john', 'test.test@t.fr', 'f0o', 'Admin');
  maria: User = new User('john', 'test.test@t.fr', 'f0o');
  users: User[] = [this.john, this.maria];

  // TODO
  signUp(): boolean {
    return true;
  }

  login(): boolean {
    return true;
  }

  findAll(): User[] {
    return this.users;
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  findMe(): User[] {
    return this.users;
  }
}
