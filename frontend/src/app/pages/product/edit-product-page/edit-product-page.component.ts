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
    this.titlePage = 'Editar Produto';
  }

  private getParamRoute = (): void => {
    this.activeRoute.params.subscribe(
      (param) => (this.productId = Number(param['id']))
    );
  };

  private getInfoProduct = () => {
    this.productService.findOne(this.productId).subscribe({
      next: (res) => {
        if (res.ProductIngredient.length) this.calcProfit = true;

        this.form.setValue({
          name: res.name,
          category: this.formatCategories(res.Product_Category),
          price: res.price,
          description: res.description,
          ingredients: [],
        });

        res.ProductIngredient.forEach((element, index) => {
          this.addRawMaterial();
          this.getRawMaterial.controls[index].setValue({
            rawMaterial: [element.RawMaterial],
            measure: this.listMeasure.filter(
              (e) => e.id === element.RawMaterial.measureRegister
            ),
            quantity: element.qtd,
          });
        });

        this.setProductPhoto(res.ProductPhoto);
      },

      error: (err) => {
        window.scroll(0, 0);
        this.eventSubjectError.next();
        this.messageError =
          'Não foi possível puxar os dados do produto. Tente Novamente.';
      },
    });
  };

  private formatCategories = (
    categories: IProductCategory[]
  ): Array<{ id: number; name: string }> => {
    return categories.map((category) => {
      return {
        id: category.category_id,
        name: category.category.name,
      };
    });
  };

  private setProductPhoto = (photos: IPhotocategory[]) => {
    const listNameFiles: string[] = [];
    photos.forEach((e) => {
      this.filesThumbProduct.push(e.url);
      listNameFiles.push(e.originalname!);
    });

    this.placeHolderInputFile = listNameFiles.join(', ');
  };

  public override onSubmit = (): void => {
    const categories = this.form.value.category.map(
      (e: { id: number; name: string }) => e.id
    );
    this.productService
      .updatedProduct(this.productId, this.form.value, categories)
      .subscribe({
        next: (res) => {
          window.scroll(0, 0);
          this.eventSubjectSucess.next();
          this.titleSucess = 'Produto Atualizado.';
          this.messageSucess = 'Produto Atualizado com sucesso';
        },

        error: (err) => {
          window.scroll(0, 0);
          this.eventSubjectError.next();
          this.titleError = 'Tente Novamente.';
          this.messageAtention = err.error.message;
        },
      });
  };
}
