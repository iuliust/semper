import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { RegisterRoutingModule } from './register-routing.module';

import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    RegisterRoutingModule,
  ],
  declarations: [ RegisterComponent ],
})
export class RegisterModule { }
