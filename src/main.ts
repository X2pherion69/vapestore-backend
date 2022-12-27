import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
<<<<<<< Updated upstream
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Vapestore API')
    .setDescription('The Vapestore API description')
    .setVersion('1.0')
    .addTag('vapestore')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
=======
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');
    app.enableCors({ origin: 'http://localhost:3000', preflightContinue: false, credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', optionsSuccessStatus: 204 });
    const configSwagger = new DocumentBuilder().setTitle('Vapestore API').setDescription('The APIs for vapestore').setVersion('1.0').build();

    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api/explorer', app, document);
    await app.listen(4000);
>>>>>>> Stashed changes
}
bootstrap();
