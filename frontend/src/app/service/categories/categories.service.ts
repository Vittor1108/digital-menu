import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//INTERFACES
import {
  ICategoriesCreate,
  ICategoriesForm,
} from '../../interfaces/ICategories-interface';

//MY IMPORTS
import { urlApi } from 'src/app/config/configAPI';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiCreateCategory: string = `${urlApi}/category`;
  private apiCategoryPhoto: string = `${urlApi}/photo-category`;
  private token: string =
    sessionStorage.getItem('token')! || localStorage.getItem('token')!;
  constructor(private readonly httpService: HttpClient) {}

  public createCategory = (
    dataForm: ICategoriesForm
  ): Observable<ICategoriesCreate> => {
    return this.httpService.post<ICategoriesCreate>(
      this.apiCreateCategory,
      {
        name: dataForm.name,
        description: dataForm.description,
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };

  public createImageCategory = (files: Array<File>, idCategory: number) => {
    files.forEach((file: File) => {
      this.httpService
        .post(
          `${this.apiCategoryPhoto}/${idCategory}`,
          {
            filename: file.name,
            originalname: file.name,
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
            console.log(res);
          },

          error: (err) => {
            console.log(err);
          },
        });
    });
  };
}
