import { prisma } from '../prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {

  async register(nome: string, email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        password: hash
      }
    });

    // nunca retornar senha
    return {
      id: user.id,
      nome: user.nome,
      email: user.email
    };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Usuário não encontrado');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Senha inválida');

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    return {
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    };
  }
}
