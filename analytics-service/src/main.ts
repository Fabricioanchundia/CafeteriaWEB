import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3005);
  console.log('📊 Analytics-service corriendo en http://localhost:3005');
}
bootstrap();
