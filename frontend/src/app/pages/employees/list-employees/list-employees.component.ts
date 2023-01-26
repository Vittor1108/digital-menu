import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { IDataGetCategories } from 'src/app/interfaces/ICategories-interface';
import { IEmploye } from 'src/app/interfaces/IEmployess-interface';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteCategoryComponent } from 'src/app/components/dialog-delete-category/dialog-delete-category.component';
@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss'],
})
export class ListEmployeesComponent implements OnInit {
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
  public quantityEmployees: number;
  public allEmployees: IEmploye[];
  public numberPages: number;
  public currentPage: number = 1;

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
        this.allEmployees = res.employees;
        this.quantityEmployees = res.count;
        if (this.dataGet.take > this.quantityEmployees)
          this.dataGet.take = this.quantityEmployees;
      },

      error: (err) => {
        console.log(err);
      },
    });
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
    this.getAllEmployees();
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
