import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import { Apollo, ApolloModule } from 'apollo-angular';
import { ApolloClientOptions } from 'apollo-client';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { ApolloCache } from 'apollo-cache';

import { AuthInterceptor } from './auth.interceptor';
import { TokenExchangerService } from './token-exchanger.service';
import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    ApolloModule,
    HttpLinkModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    TokenExchangerService,
    LocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    if (parent) {
      throw new Error('Core module is already loaded. Import it in the AppModule only');
    }
    const link = httpLink.create({ uri: 'http://localhost:4200/api/graphql' });

    const authMiddleware = new ApolloLink((operation, forward) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        if ('token' in currentUser) {
          operation.setContext({
            headers: new HttpHeaders({ authorization: `bearer ${currentUser.token}` || null})
          });
        }
      }

      return forward(operation);
    });

    apollo.create<any>({
      link: concat(authMiddleware, link),
      cache: new InMemoryCache()
    });
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
      ],
    };
  }
}
