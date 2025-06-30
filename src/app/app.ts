import { Component } from '@angular/core';
import { Formulario } from './components/formulario/formulario';
import { Graficos } from './components/graficos/graficos';

@Component({
  selector: 'app-root',
  imports: [Formulario, Graficos],
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