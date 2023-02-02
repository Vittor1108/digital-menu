import { Component, OnInit, Output } from '@angular/core';
import {
  IDataGetCategories,
  IGetAllCategories,
} from 'src/app/interfaces/ICategories-interface';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogDeleteCategoryComponent } from 'src/app/components/dialog-delete-category/dialog-delete-category.component';
import { IDefaultTable } from 'src/app/interfaces/IDefault-table-interface';

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
  @Output() public infoTable: IDefaultTable = {
    title: 'Lista Categoria',
    data: [],
    columns: ['ID', 'Nome'],
    keyNames: [{ name: 'id' }, { name: 'name', hasPhoto: true }],
    routerLink: '/home/updated-category-product/',
    deleteAction: Function,
    itemQuantity: 0,
    changeAction: Function,
  };
  public eventSubjectError: Subject<void> = new Subject<void>();
  public eventSubjectSucess: Subject<void> = new Subject<void>();
  public dataGet: IDataGetCategories = {
    take: 10,
    skip: 0,
    text: '',
  };
  public loading: boolean = false;
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  public getAllCategories = (): void => {
    this.categoriesService.getAllCategoires(this.dataGet).subscribe({
      next: (res) => {
        this.infoTable.data = res.categories;
        this.infoTable.deleteAction = this.deleteCategory;
        this.infoTable.itemQuantity = res.count;
        this.loading = true;
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
}
