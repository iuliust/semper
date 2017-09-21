import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserPrebootModule } from 'preboot/browser';
import { ApolloModule } from 'apollo-angular';

import { provideClient } from './apollo.browser';
import { AppModule } from './app.module';

import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'semper' }),
    BrowserPrebootModule.replayEvents(),
    BrowserAnimationsModule,
    ApolloModule.withClient(provideClient),
    AppModule,
  ],
  providers: [
  ],
})
export class BrowserAppModule {}
