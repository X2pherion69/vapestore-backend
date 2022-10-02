import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/createUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  signIn(@Body() user: createUserDto): Promise<{ msg: string }> {
    return this.authService.signIn(user);
  }
}
