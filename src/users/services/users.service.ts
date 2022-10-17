import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  
  // DataFixtures
  john: User = new User('john', 'john.test@t.fr', 'f0o', 'Admin');
  maria: User = new User('maria', 'maria.test@t.fr', 'b4r');
  users: User[] = [this.john, this.maria];

  // TODO
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
