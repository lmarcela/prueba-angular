import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class PaisesInterceptor implements HttpInterceptor {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log("sending token")
    const token = "token";

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError( err.message );
      })
    );
  }
}
