import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HTTPStatus } from './service/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private httpStatus: HTTPStatus,
    private spinner: NgxSpinnerService
  ) {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      if(status){
        this.spinner.show();
      }else{
        this.spinner.hide();
      }
    })
  }

  title = 'digital-menu';
}
