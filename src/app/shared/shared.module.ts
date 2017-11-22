import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';

const materialModules = [
  MatSidenavModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
];

@NgModule({
  imports: [
    ...materialModules,
    CommonModule,
  ],
  exports: [
    ...materialModules,
    CommonModule,
  ],
  declarations: []
})
export class SharedModule { }
