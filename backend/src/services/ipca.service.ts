import axios from 'axios';
import { parseMesAno, validarIntervalo } from '../utils/date.utils';

export async function obterIpca() {
  const url =
    'https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/-1/variaveis/63?localidades=N1[all]';

  const response = await axios.get(url);
  const serie = response.data[0]?.resultados[0]?.series[0]?.serie;

  const periodo = Object.keys(serie)[0];

  return {
    valor: serie[periodo],
    periodo,
  };
}

export async function obterHistoricoIpca(inicio?: string, fim?: string) {
  const inicioDate = parseMesAno(inicio);
  const fimDate = parseMesAno(fim);

  validarIntervalo(inicioDate, fimDate);

  const url =
    `https://servicodados.ibge.gov.br/api/v3/agregados/1737/periodos/all/variaveis/63?localidades=N1[all]`;

  const response = await axios.get(url);
  const serie = response.data[0]?.resultados[0]?.series[0]?.serie;

  return Object.keys(serie)
    .filter(p => {
      const ano = Number(p.substring(0, 4));
      const mes = Number(p.substring(4, 6)) - 1;
      const data = new Date(ano, mes, 1);
      return data >= inicioDate && data <= fimDate;
    })
    .map(p => ({
      data: p,
      valor: Number(serie[p]),
    }));
}