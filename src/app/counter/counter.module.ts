import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CounterComponent } from './component/counter.component';
import { CounterRoutingModule } from './counter-routing.module';

@NgModule({
  declarations: [CounterComponent],
  imports: [CommonModule, CounterRoutingModule],
})
export class CounterModule {}
