import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { KeycloakConnectModule, AuthGuard, RoleGuard } from 'nest-keycloak-connect';
import { ProductModule, UserModule, AuthModule, CommentModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './services';
import { CommentController, ProductController, UserController } from './controllers';
import { ScheduleModule } from '@nestjs/schedule';

const keyCloakOptionsProvider = {
  provide: 'keyCloakDataProvider',
  useFactory: (config: ConfigService) => {
    return {
      authServerUrl: config.get('KEYCLOAK_AUTH_URI'),
      realm: config.get('KEYCLOAK_REALM'),
      clientId: config.get('KEYCLOAK_CLIENT_ID'),
      secret: config.get('KEYCLOAK_CLIENT_SECRET'),
    };
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    KeycloakConnectModule.registerAsync(keyCloakOptionsProvider),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    ProductModule,
    CommentModule,
    UserModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, ProductController, CommentController, UserController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
