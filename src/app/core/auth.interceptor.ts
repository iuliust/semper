import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TokenExchangerService } from './token-exchanger.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private exchanger: TokenExchangerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {
    console.log('nouvelle requête');
    const token = this.exchanger.get();
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          authorization: `bearer ${ token }`
        }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

}
