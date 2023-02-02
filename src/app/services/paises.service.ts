import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
export interface ResponseApi {
  data: [];
}

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private baseUrl = 'https://countriesnow.space/api/v0.1/countries';

  constructor(private http: HttpClient) {}

  getPaises(): Observable<[] | string> {
    const url = `${this.baseUrl}/`;
    return this.http.get<ResponseApi>(url).pipe(
      map((paises) => paises.data),
      catchError(() => {
        return of("error");
      })
    );
  }

  getCities(country: string): Observable<[] | string> {
    const url = `${this.baseUrl}/cities`;
    return this.http.post<ResponseApi>(url, { country: country }).pipe(
      map((data) => data.data),
      catchError(() => {
        return of("error");
      })
    );
  }
}
