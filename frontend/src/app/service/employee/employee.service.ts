import { Injectable } from '@angular/core';
import { token } from 'src/app/helper/tokenHelper';
import { urlApi } from 'src/app/config/configAPI';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEmploye } from 'src/app/interfaces/IEmployess-interface';
import { Observable } from 'rxjs';
import { IDataGetCategories } from 'src/app/interfaces/ICategories-interface';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly token: string = token;
  private readonly urlApi: string = urlApi;

  constructor(private readonly httpService: HttpClient) {}

  public createEmployee = (data: IEmploye): Observable<IEmploye> => {
    return this.httpService.post<IEmploye>(
      `${urlApi}/employees`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        screens: data.screeens,
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };

  public registerPhoto = (
    idEmployee: number,
    file: File[]
  ): Observable<boolean> => {
    const formData = new FormData();
    formData.append('file', file[0]);
    return this.httpService.post<boolean>(
      `${urlApi}/photo-employees/${idEmployee}`,
      formData,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };

  public getAllEmployee = (
    dataGet: IDataGetCategories
  ): Observable<{
    employees: IEmploye[];
    count: number;
  }> => {
    return this.httpService.get<{
      employees: IEmploye[];
      count: number;
    }>(
      `${urlApi}/employees/take=${dataGet.take}/skip=${dataGet.skip}/text=${dataGet.text}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };

  public delete = (id: number): Observable<boolean> => {
    return this.httpService.delete<boolean>(`${urlApi}/employees/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  };

  public findById = (id: number): Observable<IEmploye> => {
    return this.httpService.get<IEmploye>(`${urlApi}/employees/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  };
}
