import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { PaisesInterceptor } from './interceptors/paises.interceptor';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, StoreModule.forRoot({}, {})],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PaisesInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
