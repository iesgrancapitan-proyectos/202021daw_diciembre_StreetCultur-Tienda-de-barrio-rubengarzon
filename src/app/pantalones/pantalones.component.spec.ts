/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PantalonesComponent } from './pantalones.component';

describe('PantalonesComponent', () => {
  let component: PantalonesComponent;
  let fixture: ComponentFixture<PantalonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantalonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
