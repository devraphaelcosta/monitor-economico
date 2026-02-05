import { Component, OnInit } from '@angular/core';
import { IndicatorCardComponent } from '../../components/indicator-card/indicator-card.component';
import { EconomicChartComponent } from '../../shared/components/economic-chart/economic-chart.component';
import { IndicadoresService } from '../../core/services/indicadores.service';
import { AuthService } from '../../shared/auth.service';
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

  // ======================
  // USUÁRIO / PDF
  // ======================
  usuarioNome = '';
  dataGeracao = '';

  // ======================
  // INDICADORES SELECIONADOS
  // ======================
  indicadoresSelecionados = {
    selic: false,
    ipca: false,
    pib: false,
    cambio: false,
  };

  selic = 'Carregando...';
  ipca = 'Carregando...';
  pib = 'Carregando...';
  cambio = 'Carregando...';

  selicAtualizadoEm = '';
  ipcaAtualizadoEm = '';
  pibAtualizadoEm = '';
  cambioAtualizadoEm = '';

  tendenciaSelic = '';
  tendenciaIpca = '';
  tendenciaPib = '';
  tendenciaCambio = '';

  selicLabels: string[] = [];
  selicHistorico: number[] = [];

  ipcaLabels: string[] = [];
  ipcaHistorico: number[] = [];

  pibLabels: string[] = [];
  pibHistorico: number[] = [];

  cambioLabels: string[] = [];
  cambioHistorico: number[] = [];

  // ======================
  // FILTROS DE DATA
  // ======================
  selicInicio = '';
  selicFim = '';

  ipcaInicio = '';
  ipcaFim = '';

  pibInicio = '';
  pibFim = '';

  cambioInicio = '';
  cambioFim = '';

  hoje = new Date();
  limiteQuatroAnos = new Date(
    new Date().setFullYear(new Date().getFullYear() - 4)
  );

  constructor(
    private indicadoresService: IndicadoresService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.definirDatasPadrao();
    this.carregarIndicadores();

    const usuario = this.authService.getUsuario();
    this.usuarioNome = usuario?.nome || 'Usuário não identificado';
    this.dataGeracao = new Date().toLocaleString('pt-BR');
  }

  // ======================
  // DATAS PADRÃO
  // ======================
  definirDatasPadrao() {
    const hoje = new Date();

    const umAnoAtras = new Date();
    umAnoAtras.setFullYear(hoje.getFullYear() - 1);

    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);

    this.selicInicio = this.formatarMesAno(umAnoAtras);
    this.selicFim = this.formatarMesAno(hoje);

    this.ipcaInicio = this.formatarMesAno(umAnoAtras);
    this.ipcaFim = this.formatarMesAno(hoje);

    this.pibInicio = this.formatarMesAno(umAnoAtras);
    this.pibFim = this.formatarMesAno(hoje);

    this.cambioInicio = this.formatarData(trintaDiasAtras);
    this.cambioFim = this.formatarData(hoje);
  }

  aplicarFiltro() {
    this.carregarIndicadores();
  }

  // ======================
  // CARREGAR INDICADORES
  // ======================
  carregarIndicadores() {

    // ===== SELIC =====
    this.indicadoresService.obterSelic().subscribe(res => {
      const v = Number(res.valor);
      this.selic = `${res.valor}%`;
      this.selicAtualizadoEm = res.data;

      if (v > 10) this.tendenciaSelic = '↑ Em alta';
      else if (v > 5) this.tendenciaSelic = '→ Moderada';
      else this.tendenciaSelic = '↓ Baixa';
    });

    this.indicadoresService
      .obterHistoricoSelic(this.selicInicio, this.selicFim)
      .subscribe(dados => {
        this.selicLabels = dados.map(d => d.data);
        this.selicHistorico = dados.map(d => d.valor);
      });

    // ===== IPCA =====
    this.indicadoresService.obterIpca().subscribe(res => {
      this.ipca = `${res.valor}%`;
      this.ipcaAtualizadoEm = this.formatarPeriodoIpca(res.periodo);
    });

    this.indicadoresService
      .obterHistoricoIpca(this.ipcaInicio, this.ipcaFim)
      .subscribe(dados => {
        this.ipcaLabels = dados.map(d => this.formatarPeriodoIpca(d.data));
        this.ipcaHistorico = dados.map(d => d.valor);
      });

    // ===== PIB =====
    this.indicadoresService.obterPib().subscribe(res => {
      this.pib = res.valor;
      this.pibAtualizadoEm = res.periodo;

      const v = Number(res.valor.replace('%', '').replace(',', '.'));
      if (v > 0) this.tendenciaPib = '↑ Em alta';
      else if (v < 0) this.tendenciaPib = '↓ Em queda';
      else this.tendenciaPib = '→ Estável';
    });

    this.indicadoresService
      .obterHistoricoPib(this.pibInicio, this.pibFim)
      .subscribe(dados => {
        this.pibLabels = dados.map(d => d.data);
        this.pibHistorico = dados.map(d => d.valor);
      });

    // ===== CÂMBIO =====
    this.indicadoresService.obterCambio().subscribe(res => {
      this.cambio = `R$ ${Number(res.valor).toFixed(2)}`;
      this.cambioAtualizadoEm = res.data;
    });

    this.indicadoresService
      .obterHistoricoCambio(this.cambioInicio, this.cambioFim)
      .subscribe(dados => {
        this.cambioLabels = dados.map(d => d.data);
        this.cambioHistorico = dados.map(d => d.valor);
      });
  }

  // ======================
  // FORMATADORES
  // ======================
  formatarMesAno(date: Date): string {
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    return `${date.getFullYear()}-${mes}`;
  }

  formatarData(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  formatarPeriodoIpca(periodo: string): string {
    if (!periodo || periodo.length !== 6) return periodo;
    return `${periodo.substring(4, 6)}/${periodo.substring(0, 4)}`;
  }

  // ======================
  // EXPORTAÇÃO PDF
  // ======================
  async exportarPDF() {

    const nenhum =
      !this.indicadoresSelecionados.selic &&
      !this.indicadoresSelecionados.ipca &&
      !this.indicadoresSelecionados.pib &&
      !this.indicadoresSelecionados.cambio;

    if (nenhum) {
      alert('Selecione pelo menos um indicador para exportar.');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    let y = 40;

    // HEADER SOMENTE NA PRIMEIRA PÁGINA
    pdf.setFontSize(14);
    pdf.text('Monitor Econômico BNDES', 10, 15);

    pdf.setFontSize(10);
    pdf.text(`Relatório gerado por: ${this.usuarioNome}`, 10, 22);
    pdf.text(`Data de geração: ${this.dataGeracao}`, 10, 28);

    pdf.setLineWidth(0.5);
    pdf.line(10, 32, 200, 32);

    const ALTURA_MAX = 120; // <-- chave para caber mais de um dashboard

    const indicadores = [
      { id: 'export-selic', ativo: this.indicadoresSelecionados.selic },
      { id: 'export-ipca', ativo: this.indicadoresSelecionados.ipca },
      { id: 'export-pib', ativo: this.indicadoresSelecionados.pib },
      { id: 'export-cambio', ativo: this.indicadoresSelecionados.cambio },
    ];

    for (const ind of indicadores) {
      if (!ind.ativo) continue;

      const el = document.getElementById(ind.id);
      if (!el) continue;

      const canvas = await html2canvas(el, { scale: 1.7 });
      const img = canvas.toDataURL('image/png');

      let h = (canvas.height * 190) / canvas.width;
      if (h > ALTURA_MAX) h = ALTURA_MAX;

      if (y + h > 270) {
        pdf.addPage();
        y = 10; // páginas seguintes sem header
      }

      pdf.addImage(img, 'PNG', 10, y, 190, h);
      y += h + 10;
    }

    pdf.save('monitor-economico.pdf');
  }
}
