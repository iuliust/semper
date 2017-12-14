import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormField,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';

const materialModules = [
  MatSidenavModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
];

@NgModule({
  imports: [
    ...materialModules,
    CommonModule,
    FormsModule,
  ],
  exports: [
    ...materialModules,
    CommonModule,
    FormsModule,
  ],
  declarations: []
})
export class SharedModule { }
