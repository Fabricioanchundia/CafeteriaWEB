import { NestFactory } from '@nestjs/core';
import { WebSocketModule } from './web-socket.module';

async function bootstrap() {
  const app = await NestFactory.create(WebSocketModule);
  app.enableCors();
  await app.listen(3006);
  console.log('🔥 WebSocket corriendo en http://localhost:3006');
}
bootstrap();
