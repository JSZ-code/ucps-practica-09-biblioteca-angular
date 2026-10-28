import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './detalle-libro.component.html',
  styleUrl: './detalle-libro.component.scss'
})
export class DetalleLibroComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly libroService = inject(LibroService);

  readonly id = this.route.snapshot.paramMap.get('id') ?? '';
  readonly libro = this.libroService.buscarPorId(this.id);
}
