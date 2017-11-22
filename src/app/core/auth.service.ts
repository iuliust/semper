import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from './local-storage.service';
import { TokenExchangerService } from './token-exchanger.service';

import {
  UserRegistrationData,
  UserRegistrationResponse,
  UserLoginResponse,
  User
} from './_models';

@Injectable()
export class AuthService {
  public token: string;
  public user: User;

  constructor(
    private http: HttpClient,
    private exchanger: TokenExchangerService,
    private localStorage: LocalStorageService,
  ) {
    if (this.localStorage.isBrowser) {
      const currentUser = JSON.parse(this.localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
      this.user = currentUser && currentUser.user;
      this.exchanger.set(this.token);
    }
  }

  async registerNewUser(user: UserRegistrationData): Promise<UserLoginResponse> {
    try {
      const res = await this.http.post<UserLoginResponse>('api/auth/register', user).toPromise();
      if ('token' in res) {
        this.token = res.token;
        this.user = res.user;
        this.localStorage.setItem('currentUser', JSON.stringify({token: this.token, user: this.user}));
        this.exchanger.set(this.token);
        return {token: this.token, user: this.user};
      } else {
        throw new Error('registration failed');
      }
    } catch (err) {
      if (err.error instanceof Error) {
        console.log('an error occured :', err.error.message);
      } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      return Promise.reject(err);
    }
  }

  async login(username: string, password: string): Promise<UserLoginResponse> {
    return this.http.post<UserLoginResponse>('/api/auth/login', {username, password})
      .toPromise()
      .then(responseBody => {
        if ('token' in responseBody) {
          this.token = responseBody.token;
          this.user = responseBody.user;
          this.localStorage.setItem('currentUser', JSON.stringify({
            token: this.token,
            user: responseBody.user
          }));
          this.exchanger.set(this.token);
          return {token: this.token, user: responseBody.user};
        } else {
          throw new Error('couldn\'t find the token in the response');
        }
      });
  }

  async logout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.token = null;
        this.user = null;
        this.localStorage.removeItem('currentUser');
        this.exchanger.set(null);
        resolve()
      }, 0);
    });
  }

  async deleteAccount(id: string): Promise<boolean> {
    try {
      const res = await this.http.delete<boolean>(`api/user/${id}`).toPromise();
      console.log(res);
      return res;
    } catch (err) {
      console.log(`Account deletion failed : ${err.error.message}`);
    }
  }

}
