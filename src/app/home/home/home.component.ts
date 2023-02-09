import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { goToCounter, goToRegisterForm } from 'src/app/utils/redirects';

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

  goToPage(page: string) {
    page === 'register'
      ? goToRegisterForm(this.router)
      : goToCounter(this.router);
  }
}
