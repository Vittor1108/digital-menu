import { Injectable } from '@angular/core';
import { token } from 'src/app/helper/tokenHelper';
import { urlApi } from 'src/app/config/configAPI';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private token: string = token;
  private urlApi: string = `${urlApi}/home-auth`;

  constructor(private readonly httpService: HttpClient) {}

  public getFunctionUser = () => {
    this.httpService
      .get(`${urlApi}/home-auth`, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      })
      .subscribe({
        next: (res) => {
          console.log(res);
        },

        error: (err) => {
          console.log(err);
        },
      });
  };
}
