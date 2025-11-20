import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.enableCors();

  await app.listen(3004);
  console.log('🚀 Auth-service corriendo en http://localhost:3004/auth');
}
bootstrap();
