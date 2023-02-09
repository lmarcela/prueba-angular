import { Router } from '@angular/router';

export const goToRegisterForm = (router: Router) => {
  router.navigate(['/auth'], { queryParams: { token: '123' } });
};
export const goToCounter = (router: Router) => {
  router.navigate(['/counter']);
};
export const goToHome = (router: Router) => {
  router.navigate(['/']);
};
