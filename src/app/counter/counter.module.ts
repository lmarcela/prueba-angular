import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CounterComponent } from './pages/counter.component';
import { CounterRoutingModule } from './counter-routing.module';
import { MaterialModule } from '../utils/material.module';

@NgModule({
  declarations: [CounterComponent],
  imports: [CommonModule, CounterRoutingModule, MaterialModule],
})
export class CounterModule {}
