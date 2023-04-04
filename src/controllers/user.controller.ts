import { Controller, Get, Post, Body, Param, Delete, Patch, Res, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { Unprotected } from 'nest-keycloak-connect';
import { StatusCodes } from 'http-status-codes';
import { httpError } from '../exception/httpErrors';
import { Response } from 'express';
import { Users } from '../models/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Unprotected()
  @Post('/')
  async createUser(@Body() body: CreateUserDto, @Res() res: Response): Promise<Response<Users>> {
    let user: Users;
    try {
      user = await this.userService.createUser(body);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.CREATED).send(user);
  }

  @Unprotected()
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response<Users>> {
    let user: Users;
    try {
      user = await this.userService.getUser(id);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.OK).send(user);
  }

  @Unprotected()
  @Delete(':id')
  async removeUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response<Users>> {
    try {
      await this.userService.removeUser(id);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.NO_CONTENT).send();
  }

  @Unprotected()
  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto, @Res() res: Response): Promise<Response<Users>> {
    let user: Users;
    try {
      user = await this.userService.updateUser(id, body);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.OK).send(user);
  }
}
