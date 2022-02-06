import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as requestIp from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(requestIp.mw());

  app.setGlobalPrefix('api', { exclude: ['graphql'] });


  app.enableShutdownHooks();
  await app.listen(process.env.PORT || 8081);
}
bootstrap();
