import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '✅ El dominio de la Cafetería está funcionando!';
  }
}
