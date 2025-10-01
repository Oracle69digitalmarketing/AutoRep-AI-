import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  async login(username: string, password: string) {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    const payload = { username, role: 'agent' };
    const token = jwt.sign(payload, secret, { expiresIn: '12h' });
    return { access_token: token };
  }
}
