import axios from 'axios';

function formatarData(date: Date): string {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

/* =======================
   CÂMBIO ATUAL (CARD)
======================= */
export async function obterCambio() {
  try {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    const url =
      `https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados` +
      `?formato=json&dataInicial=${formatarData(seteDiasAtras)}&dataFinal=${formatarData(hoje)}`;

    const response = await axios.get(url);
    const dados = response.data;

    const ultimo = dados[dados.length - 1];

    if (!ultimo?.valor) {
      throw new Error();
    }

    return {
      valor: ultimo.valor,
      data: ultimo.data,
    };
  } catch {
    return {
      valor: '—',
      data: 'Última cotação válida',
    };
  }
}

/* =======================
   CÂMBIO HISTÓRICO (GRÁFICO)
======================= */
export async function obterHistoricoCambio() {
  const hoje = new Date();
  const inicio = new Date();
  inicio.setDate(hoje.getDate() - 30);

  const url =
    `https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados` +
    `?formato=json&dataInicial=${formatarData(inicio)}&dataFinal=${formatarData(hoje)}`;

  const response = await axios.get(url);

  if (!Array.isArray(response.data)) {
    return [];
  }

  return response.data.map((item: any) => ({
    data: item.data,
    valor: Number(item.valor),
  }));
}