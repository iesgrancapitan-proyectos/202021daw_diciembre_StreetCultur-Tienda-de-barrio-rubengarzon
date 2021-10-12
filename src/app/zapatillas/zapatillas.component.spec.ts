/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ZapatillasComponent } from './zapatillas.component';

describe('ZapatillasComponent', () => {
  let component: ZapatillasComponent;
  let fixture: ComponentFixture<ZapatillasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZapatillasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZapatillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
