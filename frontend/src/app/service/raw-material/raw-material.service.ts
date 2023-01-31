import { Injectable } from '@angular/core';
import { urlApi } from 'src/app/config/configAPI';
import { token } from 'src/app/helper/tokenHelper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ICreateRawMaterial,
  IRawMaterial,
} from 'src/app/interfaces/IRawMaterial-interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RawMaterialService {
  private readonly token: string = token;
  private readonly urlApi: string = urlApi;
  constructor(private readonly httpService: HttpClient) {}

  public create = (data: ICreateRawMaterial): Observable<IRawMaterial> => {
    return this.httpService.post<IRawMaterial>(
      `${urlApi}/raw-material`,
      {
        name: data.name,
        quantity: data.qtd,
        price: data.price,
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };
}
