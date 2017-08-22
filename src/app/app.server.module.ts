import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerPrebootModule } from 'preboot/server';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

// import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { UniversalInterceptor } from './universal.interceptor';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // AppModule,
    BrowserModule.withServerTransition({ appId: 'universal' }),
    ServerModule,
    ServerPrebootModule.recordEvents({ appRoot: 'app-root' }),
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true
    },
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
