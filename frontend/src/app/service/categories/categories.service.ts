import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//INTERFACES
import {
  ICategoriesCreate,
  ICategoriesForm,
  IGetAllCategories,
  IUpdatedFormCategory,
  IUpdatedReturnCategory,
} from '../../interfaces/ICategories-interface';
import { IReturnUploadPhoto } from 'src/app/interfaces/IUpload-photo.interface';

//MY IMPORTS
import { urlApi } from 'src/app/config/configAPI';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiCategory: string = `${urlApi}/category`;
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

  public getCategoryId = (id: number): Observable<IGetAllCategories> => {
    return this.httpService.get<IGetAllCategories>(
      `${this.apiCategory}/${id}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };

  public updatedCategory = (
    id: number,
    dataCategory: IUpdatedFormCategory
  ): Observable<IUpdatedReturnCategory> => {
    return this.httpService.patch<IUpdatedReturnCategory>(
      `${this.apiCategory}/${id}`,
      {
        name: dataCategory.name,
        description: dataCategory.description,
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
      }
    );
  };






}
