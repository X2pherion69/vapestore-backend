import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { createUserDto } from './dto/createUser.dto';
import { UserInterface } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  add(@Body() user: createUserDto): Promise<Observable<UserInterface>> {
    return this.userService.add(user);
  }

  @Get()
  findAll(): Observable<UserInterface[]> {
    return this.userService.findAll();
  }

  @Get('findByEmail/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
}
