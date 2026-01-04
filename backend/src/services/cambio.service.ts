import axios from 'axios';
import { parseData, validarIntervalo, formatarBCB } from '../utils/date.utils';

export async function obterCambio() {
  const hoje = new Date();
  const inicio = new Date();
  inicio.setDate(hoje.getDate() - 7);

  const url =
    `https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados` +
    `?formato=json&dataInicial=${formatarBCB(inicio)}&dataFinal=${formatarBCB(hoje)}`;

  const dados = (await axios.get(url)).data;
  const ultimo = dados[dados.length - 1];

  return {
    valor: ultimo.valor,
    data: ultimo.data,
  };
}

export async function obterHistoricoCambio(inicio?: string, fim?: string) {
  const inicioDate = inicio ? parseData(inicio) : new Date(new Date().setDate(new Date().getDate() - 30));
  const fimDate = fim ? parseData(fim) : new Date();

  validarIntervalo(inicioDate, fimDate);

  const url =
    `https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados` +
    `?formato=json&dataInicial=${formatarBCB(inicioDate)}&dataFinal=${formatarBCB(fimDate)}`;

  const dados = (await axios.get(url)).data;

  return dados.map((item: any) => ({
    data: item.data,
    valor: Number(item.valor),
  }));
}