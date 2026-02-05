import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();
const authController = new AuthController();

// cadastro
router.post('/register', (req, res) =>
  authController.register(req, res)
);

// login
router.post('/login', (req, res) =>
  authController.login(req, res)
);

export default router;
