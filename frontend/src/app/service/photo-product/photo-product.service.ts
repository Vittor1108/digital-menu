import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { token } from 'src/app/helper/tokenHelper';
import { urlApi } from 'src/app/config/configAPI';
import { Observable } from 'rxjs';
import { IReturnCreatedProduct } from 'src/app/interfaces/IProduct-interface';
@Injectable({
  providedIn: 'root',
})
export class PhotoProductService {
  private token: string = token;
  private apiProductPhoto: string = `${urlApi}/photo-product`;
  constructor(private readonly httpService: HttpClient) {}

  public createImage = (
    idProduct: number,
    files: File[]
  ): Observable<IReturnCreatedProduct> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file as File);
    });

    return this.httpService.post<IReturnCreatedProduct>(
      `${this.apiProductPhoto}/${idProduct}`,
      formData,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };
}
