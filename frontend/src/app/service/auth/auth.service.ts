//Imports Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//External Imports
import { urlApi } from '../../config/configAPI';
import {
  ICreateUser,
  IReturnCreateUser,
} from 'src/app/interfaces/ICreate-user-interface';
import { Observable } from 'rxjs';
//Interfaces

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlCreateUser = `${urlApi}/user`;
  private apiUrlActiveAccount: string = `${urlApi}/active-account`
  constructor(private readonly http: HttpClient) {}

  public createUser = (data: ICreateUser): Observable<IReturnCreateUser> => {
    return this.http.post<IReturnCreateUser>(`${this.apiUrlCreateUser}`, {
      email: data.email,
      password: data.password,
      cpf_cnpj: data.cpfCnpj,
    });
  };

  public validationToken = (token: string) => {
    return this.http.patch
  }
}
