import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '✅ El dominio del Microservicio2 está funcionando!';
  }
}
