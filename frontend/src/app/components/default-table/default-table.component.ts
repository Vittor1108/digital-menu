import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDataGetCategories } from 'src/app/interfaces/ICategories-interface';
import {
  IDefaultTable,
  IKeyNames,
} from 'src/app/interfaces/IDefault-table-interface';
import { DialogDeleteCategoryComponent } from '../dialog-delete-category/dialog-delete-category.component';

@Component({
  selector: 'app-default-table',
  templateUrl: './default-table.component.html',
  styleUrls: ['./default-table.component.scss'],
})
export class DefaultTableComponent implements OnInit {
  @Input() infoTable: IDefaultTable;
  public numberPages: number;
  public dataGet: IDataGetCategories = {
    take: 10,
    skip: 0,
    text: '',
  };
  public currentPage: number = 1;
  ngOnInit(): void {
    this.pagination(this.infoTable.itemQuantity);
    console.log(this.infoTable.data[0].id);
  }

  constructor(private readonly dialog: MatDialog) {}

  public deleteRegister = (id: number) => {
    const dialogRef = this.dialog.open(DialogDeleteCategoryComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.infoTable.deleteAction(id);
        }
      },
    });
  };

  public checkValues = (object: IKeyNames, value: number): any => {
    if (object.isPrice) {
      return value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
    }
    return value.toString();
  };

  public changeAction = () => {
    this.infoTable.changeAction(this.dataGet);
    this.pagination(this.infoTable.itemQuantity);
  };

  public pagination = (amountRequest: number): void => {
    this.dataGet.take > this.infoTable.itemQuantity
      ? (this.dataGet.take = this.infoTable.itemQuantity)
      : (this.dataGet.take = this.dataGet.take);
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

    this.changeAction();
  };

  public buttonPage = (nextOrPrevius: boolean): void => {
    let currentPage = nextOrPrevius
      ? this.currentPage + 1
      : this.currentPage - 1;

    if (currentPage === 0) currentPage = 1;
    if (currentPage > this.numberPages) return;
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
