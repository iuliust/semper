import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MdCardModule,
  MdInputModule,
  MdFormFieldModule,
  MdProgressSpinnerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RegisterRoutingModule } from './register-routing.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DisconnectComponent } from './disconnect/disconnect.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdFormFieldModule,
    MdCardModule,
    RegisterRoutingModule,
  ],
  declarations: [ RegisterComponent, LoginComponent, DisconnectComponent,
    LoginPageComponent
],
})
export class RegisterModule { }
