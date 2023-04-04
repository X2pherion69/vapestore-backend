import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos';
import { httpError } from '../exception/httpErrors';
// import { PagingResult } from '../interfaces';
import { Users } from '../models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private userRepository: Repository<Users>) {}

  private readonly alias = 'Users';

  // async getAllUser(isDeleted = false): Promise<PagingResult<User>> {
  //     const query = this.userRepository.createQueryBuilder(this.alias).orderBy(`${this.alias}.id`, 'DESC').where(`${this.alias}.is_deleted = :isDeleted`, { isDeleted });
  //     const data = await query.getMany();
  //     const count = await query.getCount();
  //     return { data, count };
  // }

  async createUser(data: CreateUserDto): Promise<Users> {
    if (await this.checkExistEmail(data.email)) {
      throw httpError.throwExistedError();
    }
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async getUser(id: number): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) httpError.throwNotFoundError();
    return user;
  }

  async updateUser(id: number, attrs: Partial<Users>, isDeleted = false) {
    const user = await this.userRepository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.is_deleted = :isDeleted`, { isDeleted })
      .andWhere(`${this.alias}.id = :id`, { id })
      .getOne();
    if (!user) {
      httpError.throwNotFoundError();
    }
    Object.assign(user, attrs);
    return await this.userRepository.save(user);
  }

  async removeUser(id: number, isDeleted = false) {
    const user = await this.userRepository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.is_deleted = :isDeleted`, { isDeleted })
      .andWhere(`${this.alias}.id = :id`, { id })
      .getOne();
    if (!user) {
      httpError.throwNotFoundError();
    }
    return this.userRepository.remove(user);
  }

  async checkExistEmail(email: string, isDeleted = false): Promise<boolean> {
    let user: Users;
    try {
      user = await this.userRepository
        .createQueryBuilder(this.alias)
        .where(`${this.alias}.is_deleted = :isDeleted`, { isDeleted })
        .andWhere(`${this.alias}.email = :email`, { email })
        .getOne();
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    if (user) return true;
    else return false;
  }
}
