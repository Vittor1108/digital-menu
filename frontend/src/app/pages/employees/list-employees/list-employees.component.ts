import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import {
  IDataGetCategories,
  IGetAllCategories,
} from 'src/app/interfaces/ICategories-interface';
import { IEmploye } from 'src/app/interfaces/IEmployess-interface';
import { EmployeeService } from 'src/app/service/employee/employee.service';

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

  constructor(private readonly employeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  private getAllEmployees = (): void => {
    this.employeService.getAllEmployee().subscribe({
      next: (res) => {
        this.allEmployees = res;
        console.log(res);
      },

      error: (err) => {
        console.log(err);
      },
    });
  };
}
