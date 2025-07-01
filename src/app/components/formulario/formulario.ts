import { Component, signal, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class Formulario {
  periodo = signal(new FormControl<number | null>(null, Validators.max(240)));
  cuota = signal(new FormControl<number | null>(null));
  tasa = signal(new FormControl<number | null>(null));

  @Output() datosSimulacion = new EventEmitter<{ acumuladoMensual: number[], acumuladoConInteres: number[] }>();

  constructor() {
    console.log('Formulario component initialized');
  }

  calcularAcumuladoMensual(): number[] {
    const periodoValue = this.periodo().value;
    const cuotaValue = this.cuota().value;

    if (periodoValue === null || cuotaValue === null) {
      return [];
    }

    const acumulados: number[] = [];
    for (let i = 1; i <= periodoValue; i++) {
      acumulados.push(i * cuotaValue);
    }
    return acumulados;
  }

  calcularAcumuladoConInteres(): number[] {
    const periodoValue = this.periodo().value;
    const cuotaValue = this.cuota().value;
    const tasaValue = this.tasa().value;

    if (periodoValue === null || cuotaValue === null || tasaValue === null) {
      return [];
    }

    // Convert annual effective percentage rate to monthly decimal rate
    const monthlyRate = Math.pow(1 + (tasaValue / 100), 1/12) - 1;

    const acumuladosConInteres: number[] = [];
    for (let i = 1; i <= periodoValue; i++) {
      // Future value of an ordinary annuity formula
      const fv = cuotaValue * ((Math.pow(1 + monthlyRate, i) - 1) / monthlyRate);
      acumuladosConInteres.push(parseFloat(fv.toFixed(2))); // Round to 2 decimal places
    }
    return acumuladosConInteres;
  }

  simular(): void {
    const acumuladoMensual = this.calcularAcumuladoMensual();
    const acumuladoConInteres = this.calcularAcumuladoConInteres();

    

    this.datosSimulacion.emit({ acumuladoMensual, acumuladoConInteres });
  }
}