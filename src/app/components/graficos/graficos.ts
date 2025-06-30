import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-graficos',
  imports: [CommonModule, DecimalPipe],
  templateUrl: './graficos.html',
  styleUrl: './graficos.css'
})
export class Graficos {
  @Input() acumuladoMensual: number[] = [];
  @Input() acumuladoConInteres: number[] = [];
}
