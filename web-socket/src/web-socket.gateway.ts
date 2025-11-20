import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class WebSocketGatewayService {
  @WebSocketServer()
  server: Server;

  // Notificar nueva orden generada
  notifyNewOrder(order: any) {
    this.server.emit('new-order', order);
  }

  // Notificar cambio de estado
  notifyOrderStatus(order: any) {
    this.server.emit('order-status-updated', order);
  }

  // Notificar actualizaciones del dashboard (ventas)
  notifyAnalyticsUpdate(data: any) {
    this.server.emit('analytics-update', data);
  }
}
