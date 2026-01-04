export function validarIntervalo(inicio: Date, fim: Date) {
  if (inicio > fim) {
    throw new Error('Data inicial maior que a final');
  }

  const diffAnos =
    (fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24 * 365);

  if (diffAnos > 4) {
    throw new Error('Intervalo máximo permitido é de 4 anos');
  }
}

export function parseMesAno(valor?: string): Date {
  if (!valor || !/^\d{4}-\d{2}$/.test(valor)) {
    throw new Error('Formato esperado: YYYY-MM');
  }

  const [ano, mes] = valor.split('-').map(Number);
  return new Date(ano, mes - 1, 1);
}

export function parseData(valor?: string): Date {
  if (!valor || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    throw new Error('Formato esperado: YYYY-MM-DD');
  }

  return new Date(valor);
}

export function formatarBCB(date: Date): string {
  return `${String(date.getDate()).padStart(2, '0')}/${
    String(date.getMonth() + 1).padStart(2, '0')
  }/${date.getFullYear()}`;
}