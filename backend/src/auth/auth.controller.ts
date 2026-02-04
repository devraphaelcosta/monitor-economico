import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const service = new AuthService();

export class AuthController {

  async register(req: Request, res: Response) {
    try {
      const { nome, email, password } = req.body;

      const user = await service.register(nome, email, password);

      res.status(201).json(user);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const data = await service.login(email, password);

      res.json(data);
    } catch (e: any) {
      res.status(401).json({ error: e.message });
    }
  }
}
