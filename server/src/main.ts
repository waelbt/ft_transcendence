import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
<<<<<<< HEAD
  const app = await NestFactory.create(AppModule, { cors: { origin: '*', } });
   const corsOptions = {
    origin: ['*'],
    // [
    //   'http://localhost:4000',
    //   'http://localhost:8000',
    //  ],
    credentials: true,
  };
=======
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: {origin: '*',}});
>>>>>>> back-end
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }) );

  const config = new DocumentBuilder()
  .setTitle('Laughtale')
  .setDescription('Laughtale API description')
  .setVersion('1.0')
  .addTag('Laughtale')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(4000, '0.0.0.0');

  // shut down our server when the running process is killed
  app.enableShutdownHooks();
}
bootstrap();
