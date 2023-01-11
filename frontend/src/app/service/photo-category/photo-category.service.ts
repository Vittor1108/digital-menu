import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlApi } from 'src/app/config/configAPI';
import {
  IPhotocategory,
  IReturnUploadPhoto,
} from 'src/app/interfaces/IUpload-photo.interface';
import { token } from 'src/app/helper/tokenHelper';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PhotoCategoryService {
  private apiCategoryPhoto: string = `${urlApi}/photo-category`;
  private token: string = token;
  constructor(private readonly httpService: HttpClient) {}

  public createImageCategory = (
    files: Array<File | IPhotocategory>,
    idCategory: number
  ): any => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file as File);
    });
    return this.httpService.post<IReturnUploadPhoto>(
      `${this.apiCategoryPhoto}/${idCategory}`,
      formData,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      }
    );
  };

  public deleteImage = (id: number): Observable<boolean> => {
    return this.httpService.delete<boolean>(`${this.apiCategoryPhoto}/${id}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    });
  };
}
