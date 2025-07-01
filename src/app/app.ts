import { Component } from '@angular/core';
import { Formulario } from './components/formulario/formulario';
import { Graficos } from './components/graficos/graficos';
import { Resultados } from './components/resultados/resultados';

@Component({
  selector: 'app-root',
  imports: [Formulario, Graficos, Resultados],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'graficos';
  acumuladoMensualData: number[] = [];
  acumuladoConInteresData: number[] = [];

  onDatosSimulacion(data: { acumuladoMensual: number[], acumuladoConInteres: number[] }) {
    this.acumuladoMensualData = data.acumuladoMensual;
    this.acumuladoConInteresData = data.acumuladoConInteres;
  }
}