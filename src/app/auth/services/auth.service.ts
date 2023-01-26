import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  validarToken(): Observable<boolean>{
    return (new URL(window.location.href)).searchParams.get("token") === "123" ? of(true): of(false);
  }
  
}
