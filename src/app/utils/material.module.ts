import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  imports: [MatButtonModule, MatGridListModule, MatIconModule, MatTooltipModule, MatFormFieldModule],
  exports: [MatButtonModule, MatGridListModule, MatIconModule, MatTooltipModule, MatFormFieldModule],
})
export class MaterialModule {}
