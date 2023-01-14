import { Component, OnInit, Output } from '@angular/core';
import {
  IDataGetCategories,
  IGetAllCategories,
} from 'src/app/interfaces/ICategories-interface';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogDeleteCategoryComponent } from 'src/app/components/dialog-delete-category/dialog-delete-category.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category-list.component.html',
  styleUrls: ['./edit-category-list.component.scss'],
})
export class EditCategoryListComponent implements OnInit {
  @Output() public titleSucess: string = 'Categoria Excluida!';
  @Output() public messageSucess: string = 'Categoria Excluida com sucesso!';
  @Output() public messageError: string =
    'Não foi possível excluir a categoria. Tente Novamente.';
  @Output() public titleError: string = 'Tente Novamente!';
  @Output() public titleAtention: string = 'Atenção!';
  public eventSubjectError: Subject<void> = new Subject<void>();
  public eventSubjectSucess: Subject<void> = new Subject<void>();
  public dataGet: IDataGetCategories = {
    take: 10,
    skip: 0,
    text: '',
  };
  public quantityProducts: number;
  public allCategories: IGetAllCategories[];
  public numberPages: number;
  public currentPage: number = 1;
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  public getAllCategories = (): void => {
    if (this.dataGet.take > this.quantityProducts)
      this.dataGet.take = this.quantityProducts;

    this.categoriesService.getAllCategoires(this.dataGet).subscribe({
      next: (res) => {
        this.allCategories = res.categories;
        this.pagination(res.count);
        this.quantityProducts = res.count;
      },
      error: (err) => {
        this.eventSubjectError.next();
        this.messageError = 'Não foi possível carregar as categorias';
      },
    });
  };

  public deleteCategory = (id: number): void => {
    const dialogRef = this.dialog.open(DialogDeleteCategoryComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoriesService.deleteCategory(id).subscribe({
          next: (res) => {
            this.eventSubjectSucess.next();
            this.getAllCategories();
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
    this.getAllCategories();
  };

  public buttonPage = (nextOrPrevius: boolean): void => {
    if (this.currentPage === this.numberPages) return;
    let currentPage = nextOrPrevius
      ? this.currentPage + 1
      : this.currentPage - 1;

    if (currentPage === 0) currentPage = 1;

    this.changePagination(currentPage);
  };
}
