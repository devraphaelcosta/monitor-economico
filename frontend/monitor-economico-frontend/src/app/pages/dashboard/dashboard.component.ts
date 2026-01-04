import { Component, OnInit } from '@angular/core';
import { IndicatorCardComponent } from '../../components/indicator-card/indicator-card.component';
import { EconomicChartComponent } from '../../shared/components/economic-chart/economic-chart.component';
import { IndicadoresService } from '../../core/services/indicadores.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IndicatorCardComponent,
    EconomicChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  /* =======================
     CONTROLE DE SELEÇÃO
  ======================= */
  indicadoresSelecionados = {
    selic: false,
    ipca: false,
    pib: false,
    cambio: false,
  };

  /* =======================
     VALORES DOS CARDS
  ======================= */
  selic = 'Carregando...';
  ipca = 'Carregando...';
  pib = 'Carregando...';
  cambio = 'Carregando...';

  /* =======================
     DATAS
  ======================= */
  selicAtualizadoEm = '';
  ipcaAtualizadoEm = '';
  pibAtualizadoEm = '';
  cambioAtualizadoEm = '';

  /* =======================
     TENDÊNCIAS
  ======================= */
  tendenciaSelic = '';
  tendenciaIpca = '';
  tendenciaPib = '';
  tendenciaCambio = '';

  /* =======================
     DADOS DOS GRÁFICOS
  ======================= */
  selicLabels: string[] = [];
  selicHistorico: number[] = [];

  ipcaLabels: string[] = [];
  ipcaHistorico: number[] = [];

  pibLabels: string[] = [];
  pibHistorico: number[] = [];

  cambioLabels: string[] = [];
  cambioHistorico: number[] = [];

  constructor(private indicadoresService: IndicadoresService) {}

  ngOnInit(): void {

    /* =======================
       SELIC
    ======================= */
    this.indicadoresService.obterSelic().subscribe(res => {
      const valor = Number(res.valor);
      this.selic = `${res.valor}%`;
      this.selicAtualizadoEm = res.data;

      if (valor > 10) this.tendenciaSelic = '↑ Em alta';
      else if (valor > 5) this.tendenciaSelic = '→ Moderada';
      else this.tendenciaSelic = '↓ Baixa';
    });

    this.indicadoresService.obterHistoricoSelic().subscribe(dados => {
      this.selicLabels = dados.map(d => d.data);
      this.selicHistorico = dados.map(d => Number(d.valor));
    });

    /* =======================
       IPCA
    ======================= */
    this.indicadoresService.obterIpca().subscribe(res => {
      this.ipca = `${res.valor}%`;
      this.ipcaAtualizadoEm = this.formatarPeriodoIpca(res.periodo);
    });

    this.indicadoresService.obterHistoricoIpca().subscribe(dados => {
      this.ipcaLabels = dados.map(d => this.formatarPeriodoIpca(d.data));
      this.ipcaHistorico = dados.map(d => Number(d.valor));
    });

    /* =======================
       PIB
    ======================= */
    this.indicadoresService.obterPib().subscribe(res => {
      this.pib = res.valor;
      this.pibAtualizadoEm = res.periodo;

      const v = Number(res.valor.replace('%', '').replace(',', '.'));
      if (v > 0) this.tendenciaPib = '↑ Em alta';
      else if (v < 0) this.tendenciaPib = '↓ Em queda';
      else this.tendenciaPib = '→ Estável';
    });

    this.indicadoresService.obterHistoricoPib().subscribe(dados => {
      this.pibLabels = dados.map(d => d.data);
      this.pibHistorico = dados.map(d => d.valor);
    });

    /* =======================
       CÂMBIO
    ======================= */
    this.indicadoresService.obterCambio().subscribe(res => {
      this.cambio = `R$ ${Number(res.valor).toFixed(2)}`;
      this.cambioAtualizadoEm = res.data;
    });

    this.indicadoresService.obterHistoricoCambio().subscribe(dados => {
      this.cambioLabels = dados.map(d => d.data);
      this.cambioHistorico = dados.map(d => Number(d.valor));
    });
  }

  /* =======================
     UTILITÁRIOS
  ======================= */
  formatarPeriodoIpca(periodo: string): string {
    if (!periodo || periodo.length !== 6) return periodo;
    return `${periodo.substring(4, 6)}/${periodo.substring(0, 4)}`;
  }

  /* =======================
     EXPORTAÇÃO PDF
  ======================= */
async exportarPDF() {

  const nenhumSelecionado = !this.indicadoresSelecionados.selic &&
                            !this.indicadoresSelecionados.ipca &&
                            !this.indicadoresSelecionados.pib &&
                            !this.indicadoresSelecionados.cambio;

  if (nenhumSelecionado) {
    alert('Selecione pelo menos um indicador para exportar o relatório.');
    return;
  }

  const pdf = new jsPDF('p', 'mm', 'a4');
  let yPosition = 10;

  const indicadores = [
    { id: 'export-selic', ativo: this.indicadoresSelecionados.selic },
    { id: 'export-ipca', ativo: this.indicadoresSelecionados.ipca },
    { id: 'export-pib', ativo: this.indicadoresSelecionados.pib },
    { id: 'export-cambio', ativo: this.indicadoresSelecionados.cambio },
  ];

  for (const indicador of indicadores) {
    if (!indicador.ativo) continue;

    const element = document.getElementById(indicador.id);
    if (!element) continue;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (yPosition + imgHeight > 280) {
      pdf.addPage();
      yPosition = 10;
    }

    pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);
    yPosition += imgHeight + 10;
  }

  pdf.save('monitor-economico.pdf');
}
}