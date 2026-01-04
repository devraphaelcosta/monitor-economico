import axios from 'axios';
import { parseMesAno, validarIntervalo } from '../utils/date.utils';

const URL =
  'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4380/dados?formato=json';

export async function obterPib() {
  const dados = (await axios.get(URL)).data;
  const ultimo = dados[dados.length - 1];
  const penultimo = dados[dados.length - 2];

  const variacao =
    ((Number(ultimo.valor) - Number(penultimo.valor)) /
      Number(penultimo.valor)) *
    100;

  return {
    valor: `${variacao.toFixed(2)}%`,
    periodo: ultimo.data,
  };
}

export async function obterHistoricoPib(inicio?: string, fim?: string) {
  const inicioDate = parseMesAno(inicio);
  const fimDate = parseMesAno(fim);

  validarIntervalo(inicioDate, fimDate);

  const dados = (await axios.get(URL)).data;

  return dados.filter((item: any) => {
    const data = new Date(item.data.split('/').reverse().join('-'));
    return data >= inicioDate && data <= fimDate;
  });
}