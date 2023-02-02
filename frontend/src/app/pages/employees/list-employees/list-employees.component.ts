import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { IDataGetCategories } from 'src/app/interfaces/ICategories-interface';
import { IEmploye } from 'src/app/interfaces/IEmployess-interface';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteCategoryComponent } from 'src/app/components/dialog-delete-category/dialog-delete-category.component';
import { IDefaultTable } from 'src/app/interfaces/IDefault-table-interface';
@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss'],
})
export class ListEmployeesComponent implements OnInit {
  @Output() public titleSucess: string = 'Funcionário Excluida!';
  @Output() public messageSucess: string = 'Funcionário Excluida com sucesso!';
  @Output() public messageError: string =
    'Não foi possível excluir a funcionário. Tente Novamente.';
  @Output() public titleError: string = 'Tente Novamente!';
  @Output() public titleAtention: string = 'Atenção!';
  @Output() public infoTable: IDefaultTable = {
    title: 'Listar Funcionários',
    data: [],
    columns: ['ID', 'Nome', 'Login', 'Telas de Acesso'],
    keyNames: [{ name: 'id' }, { name: 'name', hasPhoto: true }],
    routerLink: '/home/edit-employee/',
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
  public loading: boolean = true;

  constructor(
    private readonly employeService: EmployeeService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  public getAllEmployees = (): void => {
    this.employeService.getAllEmployee(this.dataGet).subscribe({
      next: (res) => {
        // this.infoTable.data = res.products;
        // this.infoTable.itemQuantity = res.count;
        // this.infoTable.deleteAction = this.deleteProduct,
        // this.infoTable.changeAction = this.getAllProducts,
        console.log(res.employees);
        this.infoTable.data = res.employees;
        this.infoTable.itemQuantity = res.count;
        this.infoTable.changeAction = this.getAllEmployees;
        this.deleteEmployee = this.deleteEmployee;
        this.loading = false;
      },

      error: (err) => {
        console.log(err);
      },
    });
  };

  public deleteEmployee = (id: number): void => {
    const dialogRef = this.dialog.open(DialogDeleteCategoryComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.employeService.delete(id).subscribe({
            next: () => {
              this.messageSucess = 'Exclusão realizada com sucesso';
              this.eventSubjectSucess.next();
              window.scroll(0, 0);
              this.getAllEmployees();
            },

            error: () => {
              this.eventSubjectError.next();
              this.messageError = 'Não foi possível excluir. Tente Novamente';
              window.scroll(0, 0);
            },
          });
        }
      },
    });
  };
}
