import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from '../user/dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signIn(userDto: createUserDto): Promise<{ msg: string }> {
    const { name, password } = userDto;
    const user = await this.userRepository.findOne({ where: { name: name } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return { msg: 'Success' };
    } else {
      throw new UnauthorizedException('Please check your credentials again!');
    }
  }
}
