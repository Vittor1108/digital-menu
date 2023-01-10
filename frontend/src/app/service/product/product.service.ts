import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { token } from 'src/app/helper/tokenHelper';
import { urlApi } from '../../config/configAPI';
import { ICreateProduct } from 'src/app/interfaces/IProduct-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private token: string = token;
  private apiProduct: string = `${urlApi}/product`;
  constructor(private readonly httpSerivce: HttpClient) {}

  public createProduct = (dataProduct: ICreateProduct) => {
    console.log(dataProduct);
  };
}
