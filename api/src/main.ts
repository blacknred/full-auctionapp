import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';
import { API_PREFIX } from './__shared__/consts';
import { ValidationPipe } from './__shared__/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_PREFIX);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(cookieParser);
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  const options = new DocumentBuilder()
    .setTitle('Auctionapp API')
    .setDescription('Auctionapp REST Full API')
    .addBasicAuth()
    .addBearerAuth()
    .setVersion('1.0')
    //
    .addTag('Users')
    .addTag('Notifications')
    .addTag('Billing')
    .addTag('Offers')
    .addTag('Categories')
    .addTag('Bids')
    .addTag('Watchers')
    .addTag('Auth')
    .addTag('Metrics')
    //
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(API_PREFIX, app, document);

  app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
