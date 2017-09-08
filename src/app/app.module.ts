import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    LayoutModule,
    CoreModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    ApiService
  ],
  exports: [AppComponent]
})
export class AppModule { }
