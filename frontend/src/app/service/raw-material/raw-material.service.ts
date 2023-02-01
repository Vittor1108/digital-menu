import { Injectable } from '@angular/core';
import { urlApi } from 'src/app/config/configAPI';
import { token } from 'src/app/helper/tokenHelper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ICreateRawMaterial,
  IRawMaterial,
} from 'src/app/interfaces/IRawMaterial-interface';
import { Observable } from 'rxjs';
import { IDataGetCategories } from 'src/app/interfaces/ICategories-interface';
@Injectable({
  providedIn: 'root',
})
export class RawMaterialService {
  private readonly token: string = token;
  private readonly urlApi: string = urlApi;
  constructor(private readonly httpService: HttpClient) {}

  public create = (data: ICreateRawMaterial): Observable<IRawMaterial> => {
    console.log(data);
    return this.httpService.post<IRawMaterial>(
      `${urlApi}/raw-material`,
      {
        name: data.name,
        quantity: data.qtd,
        price: data.price,
        measureRegister: data.measure[0].id,
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };

  public getAllRawMaterial = (
    dataGet: IDataGetCategories
  ): Observable<{
    count: number;
    rawMaterial: IRawMaterial[];
  }> => {
    return this.httpService.get<{ count: number; rawMaterial: IRawMaterial[] }>(
      `${urlApi}/raw-material/take=${dataGet.take}/skip=${dataGet.skip}/text=${dataGet.text}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };

  public deleteRawMaterial = (id: number): Observable<boolean> => {
    return this.httpService.delete<boolean>(`${urlApi}/raw-material/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  };

  public getRawMaterialById = (id: number): Observable<IRawMaterial> => {
    return this.httpService.get<IRawMaterial>(`${urlApi}/raw-material/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  };

  public update = (
    id: number,
    data: ICreateRawMaterial
  ): Observable<IRawMaterial> => {
    return this.httpService.put<IRawMaterial>(
      `${urlApi}/raw-material/${id}`,
      {
        name: data.name,
        quantity: data.qtd,
        price: data.price,
        measureRegister: data.measure[0].id,
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };
}
