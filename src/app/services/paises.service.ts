import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private baseUrl = 'https://countriesnow.space/api/v0.1/countries';

  constructor(private http: HttpClient) {}

  getPaises(): Observable<[]> {
    const url = `${this.baseUrl}/`;
    return this.http.get<[]>(url);
  }

  getCities(country: string): Observable<[]> {
    const url = `${this.baseUrl}/cities`;
    return this.http.post<[]>(url, { country: country });
  }
}
