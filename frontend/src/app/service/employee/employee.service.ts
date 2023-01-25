import { Injectable } from '@angular/core';
import { token } from 'src/app/helper/tokenHelper';
import { urlApi } from 'src/app/config/configAPI';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly token: string = token;
  private readonly urlApi: string = urlApi;

  constructor(private readonly httpService: HttpClient) {}

  public createEmployee = (data: any) => {
    console.log(data);
  };
}
