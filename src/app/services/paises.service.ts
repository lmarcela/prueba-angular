import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService  implements HttpInterceptor {
  private baseUrl: string = 'https://countriesnow.space/api/v0.1/countries'

  constructor( private http: HttpClient ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("sending token")
    const token: string = "token";

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

  getPaises(): Observable<[]> {

    const url: string = `${ this.baseUrl }/`
    return this.http.get<[]>( url );
  }

  getCities(country: string): Observable<[]> {
    const url: string = `${ this.baseUrl }/cities`
    return this.http.post<[]>( url , {country:country});
  }
}
