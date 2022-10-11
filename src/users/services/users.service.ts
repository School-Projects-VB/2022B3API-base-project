import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  private readonly properties: String[] = [];

  findAll(): User[] {
    return this.users;
  }

  findMe(): String[] {
    return this.properties;
  }
}
