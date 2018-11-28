import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';

import { RegisterRoutingModule } from './register-routing.module';

import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    RegisterRoutingModule,
  ],
  declarations: [ RegisterComponent ],
})
export class RegisterModule { }
