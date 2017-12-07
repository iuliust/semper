import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

// import { provideClient } from './apollo.server';
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
  providers: [
  ],
})
export class ServerAppModule { }
