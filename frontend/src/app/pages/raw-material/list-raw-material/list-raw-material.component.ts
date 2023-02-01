import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogDeleteCategoryComponent } from 'src/app/components/dialog-delete-category/dialog-delete-category.component';
import { IDataGetCategories } from 'src/app/interfaces/ICategories-interface';
import { IRawMaterial } from 'src/app/interfaces/IRawMaterial-interface';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { RawMaterialService } from 'src/app/service/raw-material/raw-material.service';

@Component({
  selector: 'app-list-raw-material',
  templateUrl: './list-raw-material.component.html',
  styleUrls: ['./list-raw-material.component.scss'],
})
export class ListRawMaterialComponent implements OnInit {
  @Output() public titleSucess: string = 'Matéria Prima Excluida!';
  @Output() public messageSucess: string =
    'Matéria Prima Excluida com sucesso!';
  @Output() public messageError: string =
    'Não foi possível excluir a Matéria Prima. Tente Novamente.';
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
  public allRawMaterial: IRawMaterial[];
  public numberPages: number;
  public currentPage: number = 1;
  constructor(
    private readonly rawMaterialService: RawMaterialService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllRawMaterial();
  }

  public getAllRawMaterial = (): void => {
    this.rawMaterialService.getAllRawMaterial(this.dataGet).subscribe({
      next: (res) => {
        this.allRawMaterial = res.rawMaterial;
        this.pagination(res.count);
        this.quantityProducts = res.count;
        this.dataGet.take > this.quantityProducts
          ? (this.dataGet.take = this.quantityProducts)
          : (this.dataGet.take = this.dataGet.take);
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
        this.rawMaterialService.deleteRawMaterial(id).subscribe({
          next: (res) => {
            this.eventSubjectSucess.next();
            this.getAllRawMaterial();
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
    this.getAllRawMaterial();
  };

  public buttonPage = (nextOrPrevius: boolean): void => {
    if (this.currentPage === this.numberPages) return;
    let currentPage = nextOrPrevius
      ? this.currentPage + 1
      : this.currentPage - 1;

    if (currentPage === 0) currentPage = 1;

    this.changePagination(currentPage);
  };

  public exportToCSV = () => {
    const tableRows = document.querySelectorAll('tr');
    const button = document.querySelector('button > a');
    const CSVString = Array.from(tableRows)
      .map((row) =>
        Array.from(row.cells)
          .map((cell) => cell.textContent)
          .join(',')
      )
      .join('\n');

    button?.setAttribute(
      'href',
      `data:text/csvcharset=utf-8,${encodeURIComponent(CSVString)}`
    );
    button?.setAttribute('download', 'categorias.csv');
  };
}
