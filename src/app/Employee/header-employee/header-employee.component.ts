import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-employee',
  templateUrl: './header-employee.component.html',
  styleUrls: ['./header-employee.component.sass'],
})
export class HeaderEmployeeComponent implements OnInit {
  panelOpenState = false;
  constructor() {}

  ngOnInit() {}
}
