import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import indicadoresRoutes from './routes/indicadores.routes';
import authRoutes from './auth/auth.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/indicadores', indicadoresRoutes);

export default app;
