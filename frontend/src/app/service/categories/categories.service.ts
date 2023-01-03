import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//INTERFACES
import {
  ICategoriesCreate,
  ICategoriesForm,
  IGetAllCategories,
} from '../../interfaces/ICategories-interface';
import { IReturnUploadPhoto } from 'src/app/interfaces/IUpload-photo.interface';

//MY IMPORTS
import { urlApi } from 'src/app/config/configAPI';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiCategory: string = `${urlApi}/category`;
  private apiCategoryPhoto: string = `${urlApi}/photo-category`;
  private token: string =
    sessionStorage.getItem('token')! || localStorage.getItem('token')!;
  constructor(private readonly httpService: HttpClient) {}

  public createCategory = (
    dataForm: ICategoriesForm
  ): Observable<ICategoriesCreate> => {
    return this.httpService.post<ICategoriesCreate>(
      this.apiCategory,
      {
        name: dataForm.name,
        description: dataForm.description,
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };

  public createImageCategory = (
    files: Array<File>,
    idCategory: number
  ): any => {
    const formData = new FormData();
    for (let file of files) {
      formData.delete('file');
      formData.append('file', file);
      return this.httpService.post<IReturnUploadPhoto>(
        `${this.apiCategoryPhoto}/${idCategory}`,
        formData,
        {
          headers: new HttpHeaders().set(
            'Authorization',
            'Bearer ' + this.token
          ),
        }
      );
    }
  };

  public getAllCategoires = (): Observable<IGetAllCategories[]> => {
    return this.httpService.get<IGetAllCategories[]>(this.apiCategory, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  };

  public deleteCategory = (id: number): Observable<boolean> => {
    return this.httpService.delete<boolean>(`${this.apiCategory}/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  };
}
