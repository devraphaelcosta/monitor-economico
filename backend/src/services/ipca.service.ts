import axios from 'axios';

/* =======================
   IPCA ATUAL (CARD)
======================= */
export async function obterIpca() {
  const url =
    'https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/-1/variaveis/63?localidades=N1[all]';

  try {
    const response = await axios.get(url);

    const serie =
      response.data[0]?.resultados[0]?.series[0]?.serie;

    if (!serie) {
      throw new Error('IPCA indisponível');
    }

    const periodo = Object.keys(serie)[0];
    const valor = serie[periodo];

    if (!valor || valor === '...') {
      throw new Error('IPCA ainda não divulgado');
    }

    return {
      valor,
      periodo,
    };
  } catch {
    return {
      valor: 'Em atualização',
      periodo: 'Fonte: IBGE',
    };
  }
}

/* =======================
   IPCA HISTÓRICO (GRÁFICO)
======================= */
export async function obterHistoricoIpca() {
  const url =
    'https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/-12/variaveis/63?localidades=N1[all]';

  const response = await axios.get(url);

  const serie =
    response.data[0]?.resultados[0]?.series[0]?.serie;

  if (!serie) {
    return [];
  }

  return Object.keys(serie).map((periodo) => ({
    data: periodo,
    valor: Number(serie[periodo]),
  }));
}