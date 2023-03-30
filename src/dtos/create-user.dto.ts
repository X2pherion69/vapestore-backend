import * as joi from 'joi';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
}

export const vCreateUserDto = joi.object<CreateUserDto>({
  username: joi.string().required().max(20),
  firstName: joi.string().required().max(20),
  lastName: joi.string().required().max(20),
  email: joi.string().required().max(20),
  password: joi.string().required().max(20),
});
export class CreateUsersDto {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export const vCreateUsersDto = joi.object<CreateUsersDto>({
  name: joi.string().required().max(50),
  phone: joi.string().required().max(17),
  email: joi.string().required().max(20),
  address: joi.string().required().max(100),
});
