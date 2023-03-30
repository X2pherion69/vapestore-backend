import { Body, Controller, Get, HttpCode, Post, Param, Put, Res, Headers } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { Unprotected } from 'nest-keycloak-connect';
import { CreateUserDto, LoginDTO } from 'src/dtos';
import { KeycloakToken, KeycloakUserInfo } from 'src/models';
import { AuthService } from 'src/services';
import { Response } from 'express';
import { httpError } from 'src/exception/httpErrors';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Unprotected()
  @Post('login')
  login(@Body() body: LoginDTO) {
    return this._authService.loginAccess(body);
  }

  @Unprotected()
  @Post('create-user')
  async createUser(@Body() body: CreateUserDto, @Res() res: Response) {
    try {
      await this._authService.createUser(body);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.CREATED).send();
  }

  @Get('user-profile')
  async getUserProfile(@Res() res: Response, @Headers('Authorization') auth: string): Promise<Response<KeycloakUserInfo>> {
    let userInfo: KeycloakUserInfo;
    try {
      userInfo = await this._authService.getUserProfile(auth);
    } catch (error) {
      httpError.throwInternalServerError(error);
    }
    return res.status(StatusCodes.OK).send(userInfo);
  }

  @Unprotected()
  @Get('callback/:code')
  getAccessToken(@Param('code') code: string) {
    return this._authService.getAccessToken(code);
  }

  @Unprotected()
  @Post('refreshToken')
  refreshAccessToken(@Body() token: KeycloakToken) {
    return this._authService.refreshAccessToken(token.refresh_token);
  }

  @Put('/reset-password')
  resetUserPassword() {
    return null;
  }

  @Get('/user-attribute')
  GetUserAttribute() {
    return null;
  }

  @Post('/user-attribute')
  createUserAttribute() {
    return null;
  }

  @Post('logout')
  @HttpCode(204)
  logout(@Body() token: KeycloakToken) {
    return this._authService.logout(token.refresh_token);
  }
}
