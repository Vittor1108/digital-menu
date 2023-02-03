import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProductCategory } from 'src/app/interfaces/IProduct-interface';
import { IPhotocategory } from 'src/app/interfaces/IUpload-photo.interface';
import { AddProductComponent } from '../add-product/add-product.component';
@Component({
  selector: 'app-edit-product-page',
  templateUrl: '../shared/add-product.component.html',
  styleUrls: ['../shared/add-product.component.scss'],
})
export class EditProductPageComponent
  extends AddProductComponent
  implements OnInit
{
  private productId: number;
  constructor(private readonly activeRoute: ActivatedRoute) {
    super(new FormBuilder());
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getParamRoute();
    this.getInfoProduct();
  }

  private getParamRoute = (): void => {
    this.activeRoute.params.subscribe(
      (param) => (this.productId = Number(param['id']))
    );
  };

  private getInfoProduct = () => {
    this.productService.findOne(this.productId).subscribe({
      next: (res) => {
        console.log(res);
        this.form.setValue({
          name: res.name,
          price: res.price,
          category: this.formatCategories(res.Product_Category),
          description: res.description,
        });
        this.setProductPhoto(res.ProductPhoto);
      },

      error: (err) => {
        console.log(err);
      },
    });
  };

  private formatCategories = (categories: IProductCategory[]) => {
    return categories.map((category) => {
      return {
        id: category.category_id,
        name: category.category.name,
      };
    });
  };

  private setProductPhoto = (photos: IPhotocategory[]) => {
    console.log(photos);
  };
}
