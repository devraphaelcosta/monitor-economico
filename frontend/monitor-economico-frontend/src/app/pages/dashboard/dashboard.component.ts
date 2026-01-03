import { Component, OnInit } from '@angular/core';
import { IndicatorCardComponent } from '../../components/indicator-card/indicator-card.component';
import { EconomicChartComponent } from '../../shared/components/economic-chart/economic-chart.component';
import { IndicadoresService } from '../../core/services/indicadores.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IndicatorCardComponent, EconomicChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  /* =======================
     VALORES DOS CARDS
  ======================= */
  selic = 'Carregando...';
  ipca = 'Carregando...';
  pib = 'Carregando...';
  cambio = 'Carregando...';

  /* =======================
   DATAS DE ATUALIZAÇÃO
======================= */
selicAtualizadoEm = '';
ipcaAtualizadoEm = '';
pibAtualizadoEm = '';
cambioAtualizadoEm = '';


  /* =======================
     ALERTA ECONÔMICO
  ======================= */
  alertaSelic = '';

  /* =======================
   TENDÊNCIAS
======================= */
tendenciaSelic = '';
tendenciaIpca = '';
tendenciaCambio = '';



  /* =======================
     DADOS DOS GRÁFICOS
  ======================= */
  selicLabels: string[] = [];
  selicHistorico: number[] = [];

  ipcaLabels: string[] = [];
  ipcaHistorico: number[] = [];

  pibLabels: string[] = [];
  pibHistorico: number[] = []; // vazio → gráfico indisponível

  cambioLabels: string[] = [];
  cambioHistorico: number[] = [];

  constructor(private indicadoresService: IndicadoresService) {}

  ngOnInit(): void {

    /* =======================
       SELIC
    ======================= */
    this.indicadoresService.obterSelic().subscribe({
  next: (res) => {
    const valor = Number(res.valor);
    this.selic = `${res.valor}%`;
    this.selicAtualizadoEm = res.data;

    if (valor > 10) {
      this.alertaSelic = 'SELIC em patamar elevado.';
    } else if (valor > 5) {
      this.alertaSelic = 'SELIC em patamar moderado.';
    } else {
      this.alertaSelic = 'SELIC em patamar baixo.';
    }
  },
  error: () => {
    this.selic = 'Indisponível';
    this.selicAtualizadoEm = '';
  },
});


this.indicadoresService.obterHistoricoSelic().subscribe({
  next: (dados) => {
    this.selicLabels = dados.map(d => d.data);
    this.selicHistorico = dados.map(d => Number(d.valor));

    if (this.selicHistorico.length >= 2) {
      const ultimo = this.selicHistorico[this.selicHistorico.length - 1];
      const anterior = this.selicHistorico[this.selicHistorico.length - 2];

      if (ultimo > anterior) {
        this.tendenciaSelic = '↑ Em alta';
      } else if (ultimo < anterior) {
        this.tendenciaSelic = '↓ Em queda';
      } else {
        this.tendenciaSelic = '→ Estável';
      }
    }
  },
  error: () => {
    this.selicLabels = [];
    this.selicHistorico = [];
    this.tendenciaSelic = '';
  },
});

    /* =======================
       IPCA
    ======================= */
this.indicadoresService.obterIpca().subscribe({
  next: (res) => {
    this.ipca = `${res.valor}%`;
    this.ipcaAtualizadoEm = this.formatarPeriodoIpca(res.periodo);
  },
  error: () => {
    this.ipca = 'Indisponível';
    this.ipcaAtualizadoEm = '';
  },
});



  this.indicadoresService.obterHistoricoIpca().subscribe({
  next: (dados) => {
    this.ipcaLabels = dados.map(d =>
  this.formatarPeriodoIpca(d.data)
);
    this.ipcaHistorico = dados.map(d => Number(d.valor));

    if (this.ipcaHistorico.length >= 2) {
      const ultimo = this.ipcaHistorico[this.ipcaHistorico.length - 1];
      const anterior = this.ipcaHistorico[this.ipcaHistorico.length - 2];

      if (ultimo > anterior) {
        this.tendenciaIpca = '↑ Em alta';
      } else if (ultimo < anterior) {
        this.tendenciaIpca = '↓ Em queda';
      } else {
        this.tendenciaIpca = '→ Estável';
      }
    }
  },
  error: () => {
    this.ipcaLabels = [];
    this.ipcaHistorico = [];
    this.tendenciaIpca = '';
  },
});


    /* =======================
       PIB (API INCONSISTENTE)
       → gráfico NÃO aparece
    ======================= */
this.indicadoresService.obterPib().subscribe({
  next: (res) => {
    this.pib = res.valor;
    this.pibAtualizadoEm = res.periodo;
  },
  error: () => {
    this.pib = 'Indisponível';
    this.pibAtualizadoEm = '';
  },
});


    // ⚠️ Sem histórico → mantém arrays vazios
    this.pibLabels = [];
    this.pibHistorico = [];

    /* =======================
       CÂMBIO
    ======================= */
this.indicadoresService.obterCambio().subscribe({
  next: (res) => {
    this.cambio = `R$ ${Number(res.valor).toFixed(2)}`;
    this.cambioAtualizadoEm = res.data;
  },
  error: () => {
    this.cambio = 'Indisponível';
    this.cambioAtualizadoEm = '';
  },
});


this.indicadoresService.obterHistoricoCambio().subscribe({
  next: (dados) => {
    this.cambioLabels = dados.map(d => d.data);
    this.cambioHistorico = dados.map(d => Number(d.valor));

    if (this.cambioHistorico.length >= 2) {
      const ultimo = this.cambioHistorico[this.cambioHistorico.length - 1];
      const anterior = this.cambioHistorico[this.cambioHistorico.length - 2];

      if (ultimo > anterior) {
        this.tendenciaCambio = '↑ Em alta';
      } else if (ultimo < anterior) {
        this.tendenciaCambio = '↓ Em queda';
      } else {
        this.tendenciaCambio = '→ Estável';
      }
    }
  },
  error: () => {
    this.cambioLabels = [];
    this.cambioHistorico = [];
    this.tendenciaCambio = '';
  },
});

  }

  formatarPeriodoIpca(periodo: string): string {
  if (!periodo || periodo.length !== 6) {
    return periodo;
  }

  const ano = periodo.substring(0, 4);
  const mes = periodo.substring(4, 6);

  return `${mes}/${ano}`;
}

}