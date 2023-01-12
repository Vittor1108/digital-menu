import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { token } from 'src/app/helper/tokenHelper';
import { urlApi } from '../../config/configAPI';
import {
  ICreateProduct,
  IGettAllProducsts,
} from 'src/app/interfaces/IProduct-interface';
import { Observable } from 'rxjs';
import { IGetAllCategories } from 'src/app/interfaces/ICategories-interface';

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
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };

  public getAllProducts = (): Observable<IGettAllProducsts[]> => {
    return this.httpSerivce.get<IGettAllProducsts[]>(`${this.apiProduct}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  };

  public deleteProduct = (idProduct: number): Observable<boolean> => {
    return this.httpSerivce.delete<boolean>(`${this.apiProduct}/${idProduct}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  };

  public findOne = (idProduct: number): Observable<IGettAllProducsts> => {
    return this.httpSerivce.get<IGettAllProducsts>(
      `${this.apiProduct}/${idProduct}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };

  public updatedProduct = (
    idProduct: number,
    dataProduct: ICreateProduct,
    categories: number[]
  ) => {
    this.httpSerivce
      .put(
        `${this.apiProduct}/${idProduct}`,
        {
          name: dataProduct.name,
          description: dataProduct.description,
          categories_id: categories,
          price: dataProduct.price,
        },
        {
          headers: new HttpHeaders().set(
            'Authorization',
            'Bearer ' + this.token
          ),
        }
      )
      .subscribe({
        next: (res) => {
          // console.log(res);
        },

        error: (err) => {
          // console.log(err);
        },
      });
  };
}
