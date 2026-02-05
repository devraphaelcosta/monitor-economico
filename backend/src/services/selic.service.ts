import axios from 'axios';
import { parseMesAno, validarIntervalo, formatarBCB } from '../utils/date.utils';

export async function obterSelic() {
  const hoje = new Date();
  const inicio = new Date();
  inicio.setDate(hoje.getDate() - 30);

  const dataInicial = `${String(inicio.getDate()).padStart(2, '0')}/${
    String(inicio.getMonth() + 1).padStart(2, '0')
  }/${inicio.getFullYear()}`;

  const dataFinal = `${String(hoje.getDate()).padStart(2, '0')}/${
    String(hoje.getMonth() + 1).padStart(2, '0')
  }/${hoje.getFullYear()}`;

  const url =
    `https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados` +
    `?formato=json&dataInicial=${dataInicial}&dataFinal=${dataFinal}`;

  const dados = (await axios.get(url)).data;

  const ultimo = dados[dados.length - 1];

  return {
    valor: Number(ultimo.valor),
    data: ultimo.data,
  };
}

export async function obterHistoricoSelic(inicio?: string, fim?: string) {
  const inicioDate = inicio
    ? parseMesAno(inicio)
    : new Date(new Date().setMonth(new Date().getMonth() - 12));

  const fimDate = fim
    ? parseMesAno(fim)
    : new Date();

  validarIntervalo(inicioDate, fimDate);

  const url =
    `https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados` +
    `?formato=json&dataInicial=${formatarBCB(inicioDate)}&dataFinal=${formatarBCB(fimDate)}`;

  const dados = (await axios.get(url)).data;

  // 👇 AGREGAÇÃO MENSAL (1 valor por mês)
  const porMes = new Map<string, number>();

  dados.forEach((item: any) => {
    const [dia, mes, ano] = item.data.split('/');
    const chave = `${ano}-${mes}`;

    // sobrescreve → fica com o último valor do mês
    porMes.set(chave, Number(item.valor));
  });

  return Array.from(porMes.entries()).map(([mesAno, valor]) => ({
    data: mesAno, // ex: 2025-02
    valor,
  }));
}