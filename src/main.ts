import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Make all apis have prefix with /api
   * Exp: http://host:port/api/auth/login
   */
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: [process.env.FE_BASE_URL, process.env.KEYCLOAK_AUTH_URI],
    preflightContinue: false,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 204,
  });
  await app.listen(process.env.API_PORT);
}
bootstrap();
