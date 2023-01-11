import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductListComponent } from './edit-product-list.component';

describe('EditProductListComponent', () => {
  let component: EditProductListComponent;
  let fixture: ComponentFixture<EditProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
