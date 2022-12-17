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
  private apiUrlActiveAccount: string = `${urlApi}/active-account`;
  private apiUrlResetPassword: string = `${urlApi}/reset-password`;
  private apiUrlLogin: string = `${urlApi}/auth`;
  constructor(private readonly http: HttpClient) {}

  public createUser = (data: ICreateUser): Observable<IReturnCreateUser> => {
    return this.http.post<IReturnCreateUser>(`${this.apiUrlCreateUser}`, {
      email: data.email,
      password: data.password,
      cpf_cnpj: data.cpfCnpj,
    });
  };

  public validationToken = (
    token: string,
    action: number = 1
  ): Observable<boolean> => {
    if (action === 1) {
      return this.http.patch<boolean>(
        `${this.apiUrlActiveAccount}/${token}`,
        {}
      );
    } else {
      return this.http.get<boolean>(`${this.apiUrlResetPassword}/${token}`);
    }
  };

  public forgotPassowrd = (email: string): Observable<boolean> => {
    return this.http.patch<boolean>(`${this.apiUrlResetPassword}`, {
      email,
    });
  };

  public resetPassword = (
    password: string,
    token: string
  ): Observable<boolean> => {
    return this.http.patch<boolean>(`${this.apiUrlResetPassword}/${token}`, {
      password,
    });
  };

  public login = (data: {
    email: string;
    password: string;
  }): Observable<{ token: string }> => {
    return this.http.post<{ token: string }>(`${this.apiUrlLogin}`, {
      email: data.email,
      password: data.password,
    });
  };
}
