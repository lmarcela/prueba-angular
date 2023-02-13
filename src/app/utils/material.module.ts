import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSelectModule
  ],
})
export class MaterialModule {}
