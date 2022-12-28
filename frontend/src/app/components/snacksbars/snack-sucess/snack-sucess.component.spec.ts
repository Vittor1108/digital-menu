import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackSucessComponent } from './snack-sucess.component';

describe('SnackSucessComponent', () => {
  let component: SnackSucessComponent;
  let fixture: ComponentFixture<SnackSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackSucessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
