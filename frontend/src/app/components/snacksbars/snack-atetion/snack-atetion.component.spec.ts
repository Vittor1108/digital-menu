import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackAtetionComponent } from './snack-atetion.component';

describe('SnackAtetionComponent', () => {
  let component: SnackAtetionComponent;
  let fixture: ComponentFixture<SnackAtetionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackAtetionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackAtetionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
