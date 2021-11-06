import { Component, OnInit } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
import { Ropa } from 'src/app/Model/Ropa';
import { RopaService } from 'src/app/ropa.service';

@Component({
  selector: 'app-sudaderas',
  templateUrl: './sudaderas.component.html',
  styleUrls: ['./sudaderas.component.sass'],
})
export class SudaderasComponent implements OnInit {
  sudaderas: Ropa[] = [];

  constructor(private ropaServicio: RopaService) {}

  ngOnInit() {
    this.mostrarRopa();
  }

  mostrarRopa() {
    this.ropaServicio.obtenerSudaderas().subscribe((datos: any) => {
      this.sudaderas = datos['sudaderas'];
    });
  }
}
