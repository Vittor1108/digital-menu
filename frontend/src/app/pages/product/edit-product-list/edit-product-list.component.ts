import { Component, OnInit, Output } from '@angular/core';
import { IGettAllProducsts } from 'src/app/interfaces/IProduct-interface';
import { ProductService } from 'src/app/service/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteCategoryComponent } from 'src/app/components/dialog-delete-category/dialog-delete-category.component';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-edit-product-list',
  templateUrl: './edit-product-list.component.html',
  styleUrls: ['./edit-product-list.component.scss'],
})
export class EditProductListComponent implements OnInit {
  @Output() public titleSucess: string = 'Prouduto Excluído';
  @Output() public messageSucess: string = 'Prouduto Excluído com sucesso!';
  @Output() public messageError: string =
    'Não foi possível excluir o Produto. Tente Novamente.';
  @Output() public titleError: string = 'Tente Novamente!';
  public eventSubjectError: Subject<void> = new Subject<void>();
  public eventSubjectSucess: Subject<void> = new Subject<void>();
  public allProducts: IGettAllProducsts[] = [];
  constructor(
    private readonly productService: ProductService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts = (): void => {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts = res;
      },

      error: (err) => {
        this.messageError =
          'Não foi possível carregar os produtos. Tente Novamente!';
        this.eventSubjectError.next();
      },
    });
  };

  public deleteProduct = (idProduct: number): void => {
    const dialogRef = this.dialog.open(DialogDeleteCategoryComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(idProduct).subscribe({
          next: (res) => {
            this.getAllProducts();
            window.scroll(0, 0);
            this.eventSubjectSucess.next();
          },

          error: (err) => {
            this.eventSubjectError.next();
          },
        });
      }
    });
  };
}
