import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  count$: Observable<number>;

  constructor(private router: Router, private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }
  goToRegisterForm() {
    this.router.navigate(['/auth'], { queryParams: { token: '123' } });
  }
  goToCounter() {
    this.router.navigate(['/counter']);
  }
}
