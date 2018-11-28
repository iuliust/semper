import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
// import { ServerPrebootModule } from 'preboot/server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'semper' }),
    ServerModule,
    AppModule,
    // ServerPrebootModule.recordEvents({ appRoot: 'fi-root' }),
    NoopAnimationsModule,
    ModuleMapLoaderModule,
  ],
})
export class ServerAppModule { }
