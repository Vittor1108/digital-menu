import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { token } from 'src/app/helper/tokenHelper';
import { urlApi } from '../../config/configAPI';
import { ICreateProduct } from 'src/app/interfaces/IProduct-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private token: string = token;
  private apiProduct: string = `${urlApi}/product`;
  constructor(private readonly httpSerivce: HttpClient) {}

  public createProduct = (
    dataProduct: ICreateProduct
  ): Observable<ICreateProduct> => {
    return this.httpSerivce.post<ICreateProduct>(
      `${this.apiProduct}`,
      {
        name: dataProduct.name.toLocaleLowerCase(),
        price: dataProduct.price,
        categories_id: dataProduct.category,
        description: dataProduct.description,
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      }
    );
  };
}
