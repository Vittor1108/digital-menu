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

  public createImageCategory = (files: FormData, idCategory: number) => {
    for (let pars of files.entries()) {
      if (pars[1] instanceof File) {
        this.httpService
          .post(
            `${this.apiCategoryPhoto}/${idCategory}`,
            {
              filename: pars[1].name,
              originalname: pars[1].name,
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
      }
    }
  };
}
