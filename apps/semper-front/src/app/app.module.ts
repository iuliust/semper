import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { MatSidenavModule, MatMenuModule, MatButtonModule, MatIconModule } from '@angular/material';
import { SharedModule } from './shared';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FlexLayoutModule,
    LayoutModule,
    CoreModule.forRoot(),
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    ApiService,
  ],
  exports: [AppComponent]
})
export class AppModule {
}
