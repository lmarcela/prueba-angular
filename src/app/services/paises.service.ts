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
  paisesError: boolean = false;

  constructor(private http: HttpClient) {}

  getPaises(): Observable<[]> {
    const url = `${this.baseUrl}/`;
    return this.http.get<ResponseApi>(url).pipe(
      map((paises) => paises.data),
      catchError(() => {
        this.paisesError = true;
        return of();
      })
    );
  }

  getCities(country: string): Observable<[]> {
    const url = `${this.baseUrl}/cities`;
    return this.http.post<[]>(url, { country: country });
  }
}
