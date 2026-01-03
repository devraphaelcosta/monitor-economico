import axios from 'axios';

const PIB_BCB_URL =
  'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4380/dados?formato=json';

function calcularVariacaoPercentual(atual: number, anterior: number): number {
  return ((atual - anterior) / anterior) * 100;
}

/* =======================
   CARD → VARIAÇÃO %
======================= */
export async function obterPib() {
  const response = await axios.get(PIB_BCB_URL);
  const dados = response.data;

  if (!dados || dados.length < 2) {
    throw new Error('Dados insuficientes para cálculo do PIB');
  }

  const ultimo = dados[dados.length - 1];
  const penultimo = dados[dados.length - 2];

  const variacao = calcularVariacaoPercentual(
    Number(ultimo.valor),
    Number(penultimo.valor)
  );

  return {
    valor: `${variacao.toFixed(2)}%`,
    periodo: ultimo.data,
  };
}

/* =======================
   GRÁFICO → ÍNDICE
======================= */
export async function obterHistoricoPib() {
  const response = await axios.get(PIB_BCB_URL);

  const historico = response.data.map((item: any) => ({
    data: item.data,
    valor: Number(item.valor), // ÍNDICE, sem %
  }));

  // últimos 5 anos ≈ 20 trimestres
  return historico.slice(-20);
}