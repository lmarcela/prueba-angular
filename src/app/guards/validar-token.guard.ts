import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot) {
    if (route.queryParams['token'] === '123') {
      return true;
    }
    console.log('invalid token');
    this.router.navigateByUrl('/');
    return false;
  }
}
