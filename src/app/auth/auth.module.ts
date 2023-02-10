import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistroComponent } from './pages/registro/registro.component';
import { MaterialModule } from '../utils/material.module';

@NgModule({
  declarations: [RegistroComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule],
})
export class AuthModule {}
