import express from 'express';
import cors from 'cors';
import indicadoresRoutes from './routes/indicadores.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/indicadores', indicadoresRoutes);

export default app;