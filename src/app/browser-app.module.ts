import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from './app.module';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({
      appId: 'semper'
    }),
    AppModule,
  ]
})
export class BrowserAppModule {}
