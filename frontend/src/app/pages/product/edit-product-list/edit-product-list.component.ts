import { Component, OnInit, Output } from '@angular/core';
import {
  IDataGetProducts,
  IGettAllProducsts,
} from 'src/app/interfaces/IProduct-interface';
import { ProductService } from 'src/app/service/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteCategoryComponent } from 'src/app/components/dialog-delete-category/dialog-delete-category.component';
import { Subject } from 'rxjs';
import { IDefaultTable } from 'src/app/interfaces/IDefault-table-interface';
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
  @Output() public infoTable: IDefaultTable = {
    title: 'Listar Produtos',
    data: [],
    columns: ['ID', 'Nome'],
    keyNames: [{ name: 'id' }, { name: 'name', hasPhoto: true }],
    routerLink: '/home/updated-product/',
    deleteAction: Function,
    itemQuantity: 0,
    changeAction: Function,
  };
  public loading: boolean = false;
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
    this.productService.getAllProducts(this.dataGet).subscribe({
      next: (res) => {
        this.infoTable.data = res.products;
        this.infoTable.itemQuantity = res.count;
        (this.infoTable.deleteAction = this.deleteProduct),
          (this.infoTable.changeAction = this.getAllProducts),
          (this.loading = true);
      },

      error: (err) => {
        this.messageError =
          'Não foi possível carregar os produtos. Tente Novamente!';
        this.eventSubjectError.next();
      },
    });
  };

  public deleteProduct = (idProduct: number): void => {
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
  };
}
