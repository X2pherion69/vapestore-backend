import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as queryString from 'querystring';
import { catchError, map } from 'rxjs/operators';
import { KeycloakToken, KeycloakUserInfo as KeycloakUserInfoInterface } from 'src/models';
import { HttpService } from '@nestjs/axios';
import { CreateUserDto, LoginDTO } from 'src/dtos';
import { Observable } from 'rxjs';
import { Cron } from '@nestjs/schedule';

let tokenAdmin: string;
@Injectable()
export class AuthService implements OnModuleInit {
  private keycloakLoginUri: string;
  private keycloakResponseType: string;
  private keycloakScope: string;
  private keycloakRedirectUri: string;
  private keycloakClientId: string;
  private keycloakClientSecret: string;
  private keycloakTokenUri: string;
  private keycloakLogoutUri: string;
  private keycloakUserUri: string;
  private keycloakAdminUri: string;
  private keycloakUserInfoUri: string;

  constructor(readonly _config: ConfigService, private readonly _http: HttpService) {
    this.keycloakLoginUri = _config.get('KEYCLOAK_LOGIN_URI');
    this.keycloakResponseType = _config.get('KEYCLOAK_RESPONSE_TYPE');
    this.keycloakScope = _config.get('KEYCLOAK_SCOPE');
    this.keycloakRedirectUri = _config.get('KEYCLOAK_REDIRECT_URI');
    this.keycloakClientId = _config.get('KEYCLOAK_CLIENT_ID');
    this.keycloakClientSecret = _config.get('KEYCLOAK_CLIENT_SECRET');
    this.keycloakTokenUri = this._config.get('KEYCLOAK_TOKEN_URI');
    this.keycloakLogoutUri = this._config.get('KEYCLOAK_LOGOUT_URI');
    this.keycloakUserUri = this._config.get('KEYCLOAK_USER_URI');
    this.keycloakAdminUri = this._config.get('KEYCLOAK_ADMIN_URI');
    this.keycloakUserInfoUri = this._config.get('KEYCLOAK_USER_INFO');
  }

  onModuleInit() {
    this.getAdminAccessToken();
  }

  @Cron('* */10 * * * *')
  getAdminAccessToken() {
    this.getAdminPermission().subscribe({
      next(value) {
        tokenAdmin = value.access_token;
      },
    });
  }

  loginAccess(body: LoginDTO) {
    const params = {
      grant_type: 'password',
      client_id: this.keycloakClientId,
      client_secret: this.keycloakClientSecret,
      username: body.username,
      password: body.password,
      scope: 'openid',
    };
    return this._http.post(this.keycloakTokenUri, queryString.stringify(params), this.getContentType()).pipe(
      map((res) => new KeycloakToken(res.data.access_token, res.data.refresh_token, res.data.expires_in, res.data.refresh_expires_in)),
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }

  async getUserProfile(auth: string): Promise<KeycloakUserInfoInterface> {
    return await this._http.axiosRef
      .get(this.keycloakUserInfoUri, { headers: { Authorization: auth } })
      .then((res) => res.data)
      .catch((e) => {
        throw new HttpException(e.response.data, e.response.status);
      });
  }

  async createUser(body: CreateUserDto) {
    const params = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: body.password,
          temporary: false,
        },
      ],
      username: body.username,
      groups: ['Normal'],
    };
    await this._http.axiosRef
      .post(this.keycloakUserUri, params, { headers: { Authorization: `Bearer ${tokenAdmin}`, 'Content-Type': 'application/json' } })
      .catch((e) => {
        throw new HttpException(e.response.data, e.response.status);
      });
    const userId = await this.getListUser(body.email);
    await this.getNormalClientRoles(userId);
  }

  getAdminPermission(): Observable<KeycloakToken> {
    const params = {
      grant_type: 'password',
      client_id: this.keycloakClientId,
      client_secret: this.keycloakClientSecret,
      username: 'olalahuhu2@gmail.com',
      password: '123',
      scope: 'openid',
    };

    return this._http.post(this.keycloakTokenUri, queryString.stringify(params), this.getContentType()).pipe(
      map((res) => new KeycloakToken(res.data.access_token, res.data.refresh_token, res.data.expires_in, res.data.refresh_expires_in)),
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }

  async getListUser(filter?: string) {
    return await this._http.axiosRef
      .get(`${this.keycloakUserUri}`, { headers: { Authorization: `Bearer ${tokenAdmin}`, 'Content-Type': 'application/json' } })
      .then((res) => {
        if (filter)
          return res.data
            .filter((item) => item.email === filter)
            .map((item) => item.id)
            .toString();
        else return res.data;
      })
      .catch((e) => {
        throw new HttpException(e.response.data, e.response.status);
      });
  }

  async getNormalClientRoles(userId: string) {
    const clientId = await this._http.axiosRef
      .get(`${this.keycloakAdminUri}/clients`, { headers: { Authorization: `Bearer ${tokenAdmin}`, 'Content-Type': 'application/json' } })
      .then((res) =>
        res.data
          .filter((item) => item.clientId === this.keycloakClientId)
          .map((item) => item.id)
          .toString(),
      )
      .catch((e) => {
        throw new HttpException(e.response.data, e.response.status);
      });
    const clientNormalRole = await this._http.axiosRef
      .get(`${this.keycloakAdminUri}/clients/${clientId}/roles`, {
        headers: { Authorization: `Bearer ${tokenAdmin}`, 'Content-Type': 'application/json' },
      })
      .then((res) => res.data.filter((item) => item.name === 'Normal')[0])
      .catch((e) => {
        throw new HttpException(e.response.data, e.response.status);
      });
    const payloadAssign = {
      id: clientNormalRole.id,
      name: clientNormalRole.name,
      description: '',
    };
    return await this._http.axiosRef
      .post(`${this.keycloakAdminUri}/users/${userId}/role-mappings/clients/${clientId}`, [payloadAssign], {
        headers: { Authorization: `Bearer ${tokenAdmin}`, 'Content-Type': 'application/json' },
      })
      .then((res) => res.data)
      .catch((e) => {
        throw new HttpException(e.response.data, e.response.status);
      });
  }

  getAccessToken(code: string) {
    const params = {
      grant_type: 'authorization_code',
      client_id: this.keycloakClientId,
      client_secret: this.keycloakClientSecret,
      code: code,
      redirect_uri: this.keycloakRedirectUri,
    };

    return this._http.post(this.keycloakTokenUri, queryString.stringify(params), this.getContentType()).pipe(
      map((res) => new KeycloakToken(res.data.access_token, res.data.refresh_token, res.data.expires_in, res.data.refresh_expires_in)),
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }

  refreshAccessToken(refresh_token: string) {
    const params = {
      grant_type: 'refresh_token',
      client_id: this.keycloakClientId,
      client_secret: this.keycloakClientSecret,
      refresh_token,
      redirect_uri: this.keycloakRedirectUri,
    };

    return this._http.post(this.keycloakTokenUri, queryString.stringify(params), this.getContentType()).pipe(
      map((res) => new KeycloakToken(res.data.access_token, res.data.refresh_token, res.data.expires_in, res.data.refresh_expires_in)),
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }

  logout(refresh_token: string) {
    const params = {
      client_id: this.keycloakClientId,
      client_secret: this.keycloakClientSecret,
      refresh_token,
    };

    return this._http.post(this.keycloakLogoutUri, queryString.stringify(params), this.getContentType()).pipe(
      map((res) => res.data),
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }

  getContentType() {
    return { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
  }
}
