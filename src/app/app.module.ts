import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:4200/api/graphql',
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    ApolloModule.forRoot(provideClient),
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
