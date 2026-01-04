import { Router } from 'express';
import { obterSelic, obterHistoricoSelic } from '../services/selic.service';
import { obterCambio, obterHistoricoCambio } from '../services/cambio.service';
import { obterIpca, obterHistoricoIpca } from '../services/ipca.service';
import { obterPib, obterHistoricoPib } from '../services/pib.service';

const router = Router();

router.get('/selic', async (_, res) => {
  res.json(await obterSelic());
});

router.get('/ipca', async (_, res) => {
  res.json(await obterIpca());
});

router.get('/pib', async (_, res) => {
  res.json(await obterPib());
});

router.get('/cambio', async (_, res) => {
  res.json(await obterCambio());
});

/* =======================
   HISTÓRICOS COM FILTRO
======================= */

router.get('/selic/historico', async (req, res) => {
  try {
    const { inicio, fim } = req.query;
    const dados = await obterHistoricoSelic(inicio as string, fim as string);
    res.json(dados);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.get('/ipca/historico', async (req, res) => {
  try {
    const { inicio, fim } = req.query;
    const dados = await obterHistoricoIpca(inicio as string, fim as string);
    res.json(dados);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.get('/pib/historico', async (req, res) => {
  try {
    const { inicio, fim } = req.query;
    const dados = await obterHistoricoPib(inicio as string, fim as string);
    res.json(dados);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.get('/cambio/historico', async (req, res) => {
  try {
    const { inicio, fim } = req.query;
    const dados = await obterHistoricoCambio(inicio as string, fim as string);
    res.json(dados);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

export default router;