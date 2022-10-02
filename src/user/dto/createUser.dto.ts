import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class createUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  email: string;
}
