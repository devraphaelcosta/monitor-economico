import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-economic-chart',
  standalone: true,
  templateUrl: './economic-chart.component.html',
  styleUrls: ['./economic-chart.component.scss'],
})
export class EconomicChartComponent implements OnChanges {

  @Input() label!: string;
  @Input() labels: string[] = [];
  @Input() values: number[] = [];
  @Input() color = '#0d47a1';
  @Input() periodo?: string;

  @ViewChild('chartCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  ngOnChanges(_: SimpleChanges): void {
    if (!this.labels.length || !this.values.length) return;

    setTimeout(() => this.renderChart(), 0);
  }

  private renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.canvasRef.nativeElement, {
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
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }
}