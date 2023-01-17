import { Component, OnInit, Output } from '@angular/core';
import { IGettAllProducsts } from 'src/app/interfaces/IProduct-interface';
import { ProductService } from 'src/app/service/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteCategoryComponent } from 'src/app/components/dialog-delete-category/dialog-delete-category.component';
import { Subject } from 'rxjs';
import {
  IDataGetCategories,
  IGetAllCategoriesCount,
} from 'src/app/interfaces/ICategories-interface';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  @Output() public titleSucess: string = 'Produto Excluído';
  @Output() public messageSucess: string = 'Produto Excluído com sucesso!';
  @Output() public messageError: string =
    'Não foi possível excluir o produto. Tente Novamente.';
  @Output() public titleError: string = 'Tente Novamente!';
  public eventSubjectError: Subject<void> = new Subject<void>();
  public eventSubjectSucess: Subject<void> = new Subject<void>();
  public allProducts: IGettAllProducsts[] = [];
  public dataGet: IDataGetCategories = {
    skip: '',
    take: '',
    text: '',
  };
  constructor(
    private readonly productService: ProductService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts = (): void => {
    this.productService.getAllProducts(this.dataGet).subscribe({
      next: (res) => {
        this.allProducts = res.products;
      },

      error: (err) => {
        this.eventSubjectError.next();
        this.messageError =
          'Não foi possível listar os produtos. Tente Novamente';
      },
    });
  };

  public removeProduct = (idProduct: number): void => {
    const refDialog = this.dialog.open(DialogDeleteCategoryComponent);
    refDialog.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.productService.deleteProduct(idProduct).subscribe({
            next: (res) => {
              this.getAllProducts();
              this.eventSubjectSucess.next();
            },

            error: (err) => {
              this.eventSubjectError.next();
            },
          });
        }
      },
    });
  };
}
