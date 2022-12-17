//Imports Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//External Imports
import { urlApi } from '../../config/configAPI';
import CreateUser from 'src/app/interfaces/Create-user-interface';
//Interfaces


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlCreateUser = `${urlApi}/user`;
  constructor(private readonly http: HttpClient) {}

  public createUser = (data: CreateUser) => {
    this.http.post(`${this.apiUrlCreateUser}`, {
      email: data.email,
      password: data.password,
      cpf_cnpj: data.cpfCnpj
    }).subscribe({
      next: (value) => {
        console.log(value);
      },

      error: (err) => {
        console.log(err)
      }
    })
  };
}
