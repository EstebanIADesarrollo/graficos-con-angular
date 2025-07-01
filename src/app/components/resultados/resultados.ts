import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-resultados',
  imports: [CommonModule, DecimalPipe],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css'
})
export class Resultados {
  @Input() acumuladoMensual: number[] = [];
  @Input() acumuladoConInteres: number[] = [];
}