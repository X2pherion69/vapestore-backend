import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { UserInterface } from './user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async add(user: createUserDto): Promise<Observable<UserInterface>> {
    const { password } = user;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return from(
      this.userRepository
        .save({ ...user, password: hashedPassword })
        .catch(() => {
          throw new HttpException(
            "Can't create user",
            HttpStatus.NOT_ACCEPTABLE,
          );
        }),
    );
  }

  findAll(): Observable<UserInterface[]> {
    return from(this.userRepository.find());
  }

  findByEmail(email: string) {
    return from(this.userRepository.find({ where: { email: email } }));
  }
}
