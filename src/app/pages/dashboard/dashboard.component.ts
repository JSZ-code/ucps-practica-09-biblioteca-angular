import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import Chart from 'chart.js/auto';
import { LibroService } from '../../services/libro.service';
import { agruparUnidadesPorCategoria, calcularSaludCatalogo } from '../../services/catalogo-estadisticas';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  private readonly libroService = inject(LibroService);
  private readonly libros = this.libroService.obtenerTodos();

  readonly inventario = agruparUnidadesPorCategoria(this.libros);
  readonly salud = calcularSaludCatalogo(this.libros);
  readonly totalUnidades = this.inventario.reduce((suma, item) => suma + item.unidades, 0);
  readonly categorias = this.inventario.length;
  readonly porcentajeCritico = this.salud.total ? (this.salud.criticos / this.salud.total) * 100 : 0;

  @ViewChild('canvasBarras') private canvasBarras!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasDona') private canvasDona!: ElementRef<HTMLCanvasElement>;

  private graficoBarras?: Chart;
  private graficoDona?: Chart;

  /** Los canvas ya existen en el DOM cuando se dispara ngAfterViewInit. */
  ngAfterViewInit(): void {
    this.graficoBarras = new Chart(this.canvasBarras.nativeElement, {
      type: 'bar',
      data: {
        labels: this.inventario.map(item => item.categoria),
        datasets: [{
          label: 'Ejemplares disponibles',
          data: this.inventario.map(item => item.unidades),
          backgroundColor: ['#6775ef', '#37b6a6', '#f2b15d', '#6d95e7'],
          borderRadius: 9,
          maxBarThickness: 76
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: item => `${item.parsed.y ?? 0} ejemplares` } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#64748b' } },
          y: { beginAtZero: true, ticks: { precision: 0, color: '#64748b' } }
        }
      }
    });

    this.graficoDona = new Chart(this.canvasDona.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Stock crítico (< 10)', 'Stock saludable (>= 10)'],
        datasets: [{
          data: [this.salud.criticos, this.salud.saludables],
          backgroundColor: ['#ec7180', '#31b8a4'],
          borderColor: '#ffffff',
          borderWidth: 5,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: { position: 'bottom', labels: { color: '#475569', padding: 18 } },
          tooltip: { callbacks: { label: item => `${item.label}: ${item.parsed} libros` } }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.graficoBarras?.destroy();
    this.graficoDona?.destroy();
  }
}
