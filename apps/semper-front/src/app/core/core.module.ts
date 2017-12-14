import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment.prod';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import { Apollo, ApolloModule } from 'apollo-angular';
import { ApolloClientOptions } from 'apollo-client';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloCache } from 'apollo-cache';

import { ControlsModule } from '../controls/controls.module';
import { AuthInterceptor } from './auth.interceptor';
import { TokenExchangerService } from './token-exchanger.service';
import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';
import { StreamModule } from 'app/stream/stream.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    environment.production ? ServiceWorkerModule.register('./ngsw-worker.js') : [],
    MatSnackBarModule,
    ApolloModule,
    HttpLinkModule,
    ControlsModule,
    StreamModule,
  ],
  declarations: [ ],
  providers: [ ],
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
    const uploadLink = createUploadLink({ uri: 'http://localhost:4200/api/graphql' });

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
      link: concat(authMiddleware, uploadLink),
      cache: new InMemoryCache()
    });
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
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
    };
  }
}
