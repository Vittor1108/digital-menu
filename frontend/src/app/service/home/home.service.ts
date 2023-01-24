import { Injectable } from '@angular/core';
import { token } from 'src/app/helper/tokenHelper';
import { urlApi } from 'src/app/config/configAPI';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReturnCreateUser } from 'src/app/interfaces/ICreate-user-interface';
import { IEmploye } from 'src/app/interfaces/IEmployess-interface';
import { IScreens } from 'src/app/interfaces/IEmployess-interface';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private token: string = token;
  private urlApi: string = `${urlApi}/home-auth`;

  constructor(private readonly httpService: HttpClient) {}

  public getFunctionUser = (): Observable<IReturnCreateUser | IEmploye> => {
    return this.httpService.get<IReturnCreateUser | IEmploye>(
      `${urlApi}/home-auth`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      }
    );
  };
}
