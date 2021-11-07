import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.sass'],
})
export class BodyComponent implements OnInit {
  constructor(readonly snackBar: MatSnackBar) {}

  ngOnInit() {
    return this.snackBar.open('Este sitio web es un proyecto de FP que está en desarrollo.', 'De acuerdo', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
