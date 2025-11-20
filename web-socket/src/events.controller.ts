import { Controller, Post, Body } from '@nestjs/common';
import { WebSocketGatewayService } from './web-socket.gateway';

@Controller('events')
export class EventsController {
  constructor(private readonly wsGateway: WebSocketGatewayService) {}

  @Post('new-order')
  handleNewOrder(@Body() order: any) {
    this.wsGateway.notifyNewOrder(order);
    return { message: 'OK', sent: order };
  }

  @Post('order-status')
  handleOrderStatus(@Body() order: any) {
    this.wsGateway.notifyOrderStatus(order);
    return { message: 'Status updated', order };
  }
}
