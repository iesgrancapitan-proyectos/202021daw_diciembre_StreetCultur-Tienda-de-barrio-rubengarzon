/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SudaderasComponent } from './sudaderas.component';

describe('SudaderasComponent', () => {
  let component: SudaderasComponent;
  let fixture: ComponentFixture<SudaderasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SudaderasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SudaderasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
