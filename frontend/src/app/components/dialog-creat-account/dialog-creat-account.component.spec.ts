import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreatAccountComponent } from './dialog-creat-account.component';

describe('DialogCreatAccountComponent', () => {
  let component: DialogCreatAccountComponent;
  let fixture: ComponentFixture<DialogCreatAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreatAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreatAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
