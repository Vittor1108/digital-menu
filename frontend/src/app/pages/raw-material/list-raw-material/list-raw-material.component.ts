import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { IDataGetCategories } from 'src/app/interfaces/ICategories-interface';
import { IDefaultTable } from 'src/app/interfaces/IDefault-table-interface';
import { IRawMaterial } from 'src/app/interfaces/IRawMaterial-interface';
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
  @Output() public infoTable: IDefaultTable = {
    title: 'Listar Matéria Prima',
    data: [],
    columns: ['ID', 'Nome', 'Preço médio pago', 'Preço médio de 100G'],
    keyNames: [
      { name: 'id' },
      { name: 'name' },
      { name: 'averagePrice', isPrice: true },
      { name: 'averagePriceGg', isPrice: true },
    ],
    routerLink: '/home/edit-raw-material/',
    deleteAction: Function,
    itemQuantity: 0,
    changeAction: Function,
  };
  public loading: boolean = false;
  public dataGet: IDataGetCategories = {
    take: 10,
    skip: 0,
    text: '',
  };
  public eventSubjectError: Subject<void> = new Subject<void>();
  public eventSubjectSucess: Subject<void> = new Subject<void>();
  public quantityProducts: number;
  public allRawMaterial: IRawMaterial[];
  public numberPages: number;
  public currentPage: number = 1;
  constructor(private readonly rawMaterialService: RawMaterialService) {}

  ngOnInit(): void {
    this.getAllRawMaterial(this.dataGet);
    this.infoTable.changeAction = this.getAllRawMaterial;
  }

  public getAllRawMaterial = (dataGet: IDataGetCategories): void => {
    this.rawMaterialService.getAllRawMaterial(dataGet).subscribe({
      next: (res) => {
        this.infoTable.data = res.rawMaterial;
        this.infoTable.deleteAction = this.deleteRawMaterial;
        this.infoTable.itemQuantity = res.count;
        this.loading = true;
      },
      error: (err) => {
        this.eventSubjectError.next();
        this.messageError = 'Não foi possível carregar as categorias';
      },
    });
  };

  public deleteRawMaterial = (id: number): void => {
    this.rawMaterialService.deleteRawMaterial(id).subscribe({
      next: (res) => {
        this.eventSubjectSucess.next();
        this.getAllRawMaterial(this.dataGet);
      },

      error: (err) => {
        this.eventSubjectError.next();
      },
    });
  };
}
