import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { compare } from 'bcrypt';   // 👈 FALTABA ESTO
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // ============================
  // 📌 REGISTRO
  // ============================
  async register(email: string, password: string, role: string = 'customer') {
    const exists = await this.userRepo.findOne({ where: { email } });
    if (exists) throw new UnauthorizedException('El usuario ya existe');

    const hashed = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      email,
      password: hashed,
      role,
    });

    await this.userRepo.save(user);

    return { message: 'Usuario registrado con éxito', user };
  }

  // ============================
  // 📌 LOGIN
  // ============================
  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) throw new UnauthorizedException('Email incorrecto');

    // 👇 AHORA SÍ FUNCIONA
    const isMatch = await compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}
