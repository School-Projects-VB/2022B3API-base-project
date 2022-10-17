import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createuser.dto';
import { LoginUserDto } from '../dto/loginuser.dto';
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
    return this.usersRepository.save(this.usersRepository.create(body));
  }

  // TODO
  loginUser(body: LoginUserDto): Promise<User> {
    return
  }
}
