import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { token } from 'src/app/helper/tokenHelper';
import { urlApi } from 'src/app/config/configAPI';
import { IScreen } from 'src/app/interfaces/IScreens-interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ScreensService {
  private readonly token: string = token;
  private readonly urlApi: string = urlApi;
  constructor(private readonly httpService: HttpClient) {}

  public findAllScreens = (): Observable<IScreen[]> => {
    return this.httpService.get<IScreen[]>(`${urlApi}/screens`);
  };
}
