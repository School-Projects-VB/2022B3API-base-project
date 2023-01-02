import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createuser.dto';
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

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }
    
    return user;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  createUser(body: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(body);
    return this.usersRepository.save(newUser);;
  }
}
