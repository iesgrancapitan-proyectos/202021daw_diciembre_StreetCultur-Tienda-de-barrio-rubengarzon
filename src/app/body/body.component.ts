import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.sass'],
})
export class BodyComponent implements OnInit {

  idImagen = 1;

  constructor() {}

  ngOnInit() {}
  /**
   * Retroceder imagen del slider
   */
  retrocederImagen(){
    if (this.idImagen == 1) {
      this.idImagen = 3;
    } else if (this.idImagen == 2) {
      this.idImagen = 1;
    } else if (this.idImagen == 3) {
      this.idImagen = 2;
    }
  }
  /**
   * Avanzar imagen del slider
   */
  avanzarImagen(){
    if (this.idImagen == 1) {
      this.idImagen = 2;
    }else if(this.idImagen == 2){
      this.idImagen = 3;
    }else if(this.idImagen == 3){
      this.idImagen = 1;
    }
  }
}
