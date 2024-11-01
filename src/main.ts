import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
  app.enableCors({
    origin : 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  })



}
bootstrap();
