import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRawMaterialComponent } from './list-raw-material.component';

describe('ListRawMaterialComponent', () => {
  let component: ListRawMaterialComponent;
  let fixture: ComponentFixture<ListRawMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRawMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRawMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
