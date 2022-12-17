import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}

@Injectable()
export class HTTPListener implements HttpInterceptor {
  private _requests = 0;
  constructor(private status: HTTPStatus, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    ++this._requests;
    this.status.setHttpStatus(true);
    return next.handle(req).pipe(
      map((event) => {
        return event;
      }),

      finalize(() => {
        --this._requests;
        this.status.setHttpStatus(this._requests > 0);
      })
    );
  }
}
