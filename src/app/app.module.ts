import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';

const routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    ApiService
  ],
  exports: [AppComponent]
})
export class AppModule { }
