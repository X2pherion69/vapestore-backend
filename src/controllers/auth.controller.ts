import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Res, UsePipes } from '@nestjs/common';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor() {

  }
}
