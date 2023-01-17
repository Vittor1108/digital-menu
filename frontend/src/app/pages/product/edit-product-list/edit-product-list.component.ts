import { Component, OnInit, Output } from '@angular/core';
import {
  IDataGetProducts,
  IGettAllProducsts,
} from 'src/app/interfaces/IProduct-interface';
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
  public quantityProducts: number;
  public currentPage: number = 1;
  public numberPages: number;
  public dataGet: IDataGetProducts = {
    take: 10,
    skip: 0,
    text: '',
  };
  constructor(
    private readonly productService: ProductService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts = (): void => {
    console.log(this.dataGet.text);
    if (this.dataGet.take > this.quantityProducts)
      this.dataGet.take = this.quantityProducts;
    this.productService.getAllProducts(this.dataGet).subscribe({
      next: (res) => {
        this.allProducts = res.products;
        this.quantityProducts = res.count;
        this.pagination(res.count);
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

  public pagination = (amountRequest: number): void => {
    this.numberPages = Math.ceil(amountRequest / Number(this.dataGet.take));
  };

  public buttonPage = (nextOrPrevius: boolean): void => {
    if (this.currentPage === this.numberPages) return;
    let currentPage = nextOrPrevius
      ? this.currentPage + 1
      : this.currentPage - 1;

    if (currentPage === 0) currentPage = 1;

    this.changePagination(currentPage);
  };

  public changePagination = (numberPage: number): void => {
    if (numberPage > this.currentPage) {
      this.currentPage = numberPage;
      this.dataGet.skip = Number(this.dataGet.take) * (numberPage - 1);
    }

    if (numberPage < this.currentPage) {
      this.dataGet.skip =
        (this.currentPage - numberPage) * Number(this.dataGet.take);
      this.dataGet;
      this.currentPage = numberPage;
    }

    if (numberPage === 1) {
      this.currentPage = numberPage;
      this.dataGet.skip = 0;
    }
    this.getAllProducts();
  };
}
