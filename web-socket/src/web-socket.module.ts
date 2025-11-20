import { Module } from '@nestjs/common';
import { WebSocketGatewayService } from './web-socket.gateway';
import { EventsController } from './events.controller';
@Module({
  controllers: [EventsController],
  providers: [WebSocketGatewayService],
  exports: [WebSocketGatewayService], // para que otros servicios lo usen
})
export class WebSocketModule {}
