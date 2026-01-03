import axios from 'axios';

/**
 * SELIC ATUAL (card)
 */
export async function obterSelic() {
  const url =
    'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados?formato=json';

  try {
    const response = await axios.get(url);
    const dados = response.data;

    const ultimo = dados[dados.length - 1];

    if (!ultimo?.valor) {
      throw new Error('SELIC indisponível');
    }

    return {
      valor: ultimo.valor,
      data: ultimo.data,
    };
  } catch {
    return {
      valor: 'Indisponível',
      data: '',
    };
  }
}

/**
 * HISTÓRICO DA SELIC (gráfico)
 */
export async function obterHistoricoSelic() {
  const url =
    'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados?formato=json';

  try {
    const response = await axios.get(url);
    const dados = response.data;

    // últimos 12 registros
    const ultimos = dados.slice(-12);

    return ultimos.map((item: any) => ({
      data: item.data,
      valor: Number(item.valor),
    }));
  } catch {
    return [];
  }
}