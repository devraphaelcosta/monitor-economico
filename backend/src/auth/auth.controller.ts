import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const service = new AuthService();

// regex de validação
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// pelo menos:
// - 1 maiúscula
// - 1 minúscula
// - 1 símbolo !@#$%&
// - mínimo 8 caracteres
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&])[A-Za-z\d!@#$%&]{8,}$/;

export class AuthController {

  async register(req: Request, res: Response) {
    try {
      const { nome, email, password } = req.body;

      // validações básicas
      if (!nome || !email || !password) {
        return res.status(400).json({
          error: 'Todos os campos são obrigatórios'
        });
      }

      if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({
          error: 'Email em formato inválido'
        });
      }

      if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({
          error:
            'A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula e símbolo (!@#$%&)'
        });
      }

      const user = await service.register(nome, email, password);

      return res.status(201).json(user);

    } catch (e: any) {
      return res.status(400).json({
        error: e.message || 'Erro ao cadastrar usuário'
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: 'Email e senha são obrigatórios'
        });
      }

      const data = await service.login(email, password);

      return res.json(data);

    } catch (e: any) {
      return res.status(401).json({
        error: e.message || 'Email ou senha inválidos'
      });
    }
  }
}
