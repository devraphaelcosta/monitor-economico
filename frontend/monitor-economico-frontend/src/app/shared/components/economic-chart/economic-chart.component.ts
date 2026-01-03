import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-economic-chart',
  standalone: true,
  templateUrl: './economic-chart.component.html',
  styleUrls: ['./economic-chart.component.scss'],
})
export class EconomicChartComponent implements OnChanges {

  @Input() chartId!: string;
  @Input() label!: string;
  @Input() labels: string[] = [];
  @Input() values: number[] = [];
  @Input() color = '#0d47a1';
  @Input() updatedAt?: string;


  private chart: Chart | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.labels?.length || !this.values?.length) {
      return;
    }

    const canvas = document.getElementById(this.chartId) as HTMLCanvasElement;
    if (!canvas) return;

    // Evita gráfico duplicado
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            data: this.values,
            borderColor: this.color,
            backgroundColor: `${this.color}22`,
            fill: true,
            tension: 0.3,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }
}