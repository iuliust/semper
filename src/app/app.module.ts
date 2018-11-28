import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,

    LayoutModule,
    CoreModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    ApiService
  ],
  declarations: [
    AppComponent
  ],
  exports: [AppComponent]
})
export class AppModule { }
