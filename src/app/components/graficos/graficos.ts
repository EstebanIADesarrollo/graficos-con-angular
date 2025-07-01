import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-graficos',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './graficos.html',
  styleUrl: './graficos.css'
})
export class Graficos implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() acumuladoMensual: number[] = [];
  @Input() acumuladoConInteres: number[] = [];

  public lineChartData: any = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Acumulado Mensual',
        fill: false,
        tension: 0.4,
        borderColor: '#ED8B86',
        backgroundColor: 'rgba(237, 139, 134, 0.2)'
      },
      {
        data: [],
        label: 'Acumulado con Interés',
        fill: false,
        tension: 0.4,
        borderColor: '#187479',
        backgroundColor: 'rgba(24, 116, 121, 0.2)'
      }
    ]
  };

  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartType: any = 'line';

  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isBrowser && (changes['acumuladoMensual'] || changes['acumuladoConInteres'])) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    const labels = Array.from({ length: this.acumuladoMensual.length }, (_, i) => `Periodo ${i + 1}`);

    this.lineChartData.labels = labels;
    this.lineChartData.datasets[0].data = this.acumuladoMensual;
    this.lineChartData.datasets[1].data = this.acumuladoConInteres;

    this.chart?.update();
  }
}
