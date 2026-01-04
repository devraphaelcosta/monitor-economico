import axios from 'axios';
import { parseMesAno, validarIntervalo, formatarBCB } from '../utils/date.utils';

export async function obterSelic() {
  const url =
    'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados?formato=json';
  const dados = (await axios.get(url)).data;
  const ultimo = dados[dados.length - 1];

  return {
    valor: ultimo.valor,
    data: ultimo.data,
  };
}

export async function obterHistoricoSelic(inicio?: string, fim?: string) {
  const inicioDate = inicio ? parseMesAno(inicio) : new Date(new Date().setMonth(new Date().getMonth() - 12));
  const fimDate = fim ? parseMesAno(fim) : new Date();

  validarIntervalo(inicioDate, fimDate);

  const url =
    `https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados` +
    `?formato=json&dataInicial=${formatarBCB(inicioDate)}&dataFinal=${formatarBCB(fimDate)}`;

  const dados = (await axios.get(url)).data;

  return dados.map((item: any) => ({
    data: item.data,
    valor: Number(item.valor),
  }));
}