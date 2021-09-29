import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.sass'],
})
export class BodyComponent implements OnInit {
  src = '../../assets/prueba.jpg';

  constructor() {}

  ngOnInit() {}

   cambiarImagen() {
    return this.src;
  }
}
