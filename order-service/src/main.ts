import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters({
    catch(exception, _host) {
      console.error('Error global:', exception);
      throw exception;
    }
  });
  await app.listen(3003);
  console.log('🚀 Microservicio3 corriendo en http://localhost:3003');
}
bootstrap();