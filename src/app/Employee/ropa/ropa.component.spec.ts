/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RopaComponent } from './ropa.component';

describe('RopaComponent', () => {
  let component: RopaComponent;
  let fixture: ComponentFixture<RopaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RopaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RopaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
