import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  menu = "none";

  constructor() { }

  ngOnInit() {
  }

  estadoMenu(){
    if(this.menu == "none"){
      this.menu = "block"
    }else{
      this.menu = "none";
    }
  }

  abrirCerrar(){
    return this.menu;
  }


}
