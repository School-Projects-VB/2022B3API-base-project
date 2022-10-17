import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findMe(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  createUser(body: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(body);
    return this.usersRepository.save(newUser);
  }
}
