import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RegisterRoutingModule } from './register-routing.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DisconnectComponent } from './disconnect/disconnect.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    RegisterRoutingModule,
  ],
  declarations: [ RegisterComponent, LoginComponent, DisconnectComponent ],
})
export class RegisterModule { }
