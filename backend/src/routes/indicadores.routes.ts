import { Router } from 'express';
import { obterSelic } from '../services/selic.service';
import { obterCambio } from '../services/cambio.service';
import { obterIpca } from '../services/ipca.service';
import { obterPib, obterHistoricoPib } from '../services/pib.service';
import { obterHistoricoSelic } from '../services/selic.service';
import { obterHistoricoIpca } from '../services/ipca.service';
import { obterHistoricoCambio } from '../services/cambio.service';

const router = Router();

router.get('/selic', async (req, res) => {
  try {
    const selic = await obterSelic();
    res.json(selic);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar SELIC' });
  }
});

router.get('/cambio', async (req, res) => {
  try {
    const cambio = await obterCambio();
    res.json(cambio);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar câmbio' });
  }
});

router.get('/ipca', async (req, res) => {
  try {
    const ipca = await obterIpca();
    res.json(ipca);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar IPCA' });
  }
});

router.get('/pib', async (req, res) => {
  try {
    const pib = await obterPib();
    res.json(pib);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar PIB' });
  }
});

router.get('/selic/historico', async (req, res) => {
  try {
    const historico = await obterHistoricoSelic();
    res.json(historico);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar histórico da SELIC' });
  }
});

router.get('/ipca/historico', async (req, res) => {
  const historico = await obterHistoricoIpca();
  res.json(historico);
});

router.get('/cambio/historico', async (req, res) => {
  const historico = await obterHistoricoCambio();
  res.json(historico);
});

router.get('/pib/historico', async (req, res) => {
  try {
    const historico = await obterHistoricoPib();
    res.json(historico);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar histórico do PIB' });
  }
});


export default router;