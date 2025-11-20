import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '✅ El dominio del Microservicio3 está funcionando!';
  }
}
