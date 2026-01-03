import axios from 'axios';

export async function obterPib() {
  const url =
    'https://servicodados.ibge.gov.br/api/v3/agregados/5932/periodos/-1/variaveis/6560?localidades=N1[all]';

  try {
    const response = await axios.get(url);

    const serie =
      response.data[0]?.resultados[0]?.series[0]?.serie;

    if (!serie) {
      throw new Error('Estrutura inesperada do SIDRA');
    }

    const periodo = Object.keys(serie)[0];
    const valor = serie[periodo];

    if (!valor || valor === '...') {
      throw new Error('PIB ainda não divulgado');
    }

    return {
      valor,
      periodo,
    };
  } catch (error) {
    // Fallback institucional
    return {
      valor: 'Em atualização',
      periodo: 'Fonte: IBGE',
    };
  }
}