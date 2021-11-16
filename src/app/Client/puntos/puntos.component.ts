import { Component, OnInit } from '@angular/core';
import { PuntosService } from 'src/app/puntos.service';

@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.sass']
})
export class PuntosComponent implements OnInit {

  puntos:number;

  constructor(private puntosServicio: PuntosService) { }

  ngOnInit() {
    this.puntosServicio.obtenerPuntos(sessionStorage.getItem("id")).subscribe( (datos) => {
     this.puntos = datos["puntos"];
    });
  }

}
