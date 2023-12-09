import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: {origin: 'http://localhost:8000', credentials: true}});
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }) );

  const config = new DocumentBuilder()
  .setTitle('Laughtale')
  .setDescription('Laughtale API description')
  .setVersion('1.0')
  .addTag('Laughtale')
  .addCookieAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.use(cookieParser());

  // app.useGlobalGuards(new accessTokenGuard())

  await app.listen(4000, '0.0.0.0');

  // shut down our server when the running process is killed
  app.enableShutdownHooks();
}
bootstrap();
