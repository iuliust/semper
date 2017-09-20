import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

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

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.user = currentUser && currentUser.user;
  }

  async registerNewUser(user: UserRegistrationData): Promise<UserLoginResponse> {
    try {
      const res = await this.http.post<UserLoginResponse>('api/auth/register', user).toPromise();
      if ('token' in res) {
        this.token = res.token;
        this.user = res.user;
        localStorage.setItem('currentUser', JSON.stringify({token: this.token, user: this.user}));
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

  async login(userName: string, password: string): Promise<UserLoginResponse> {
    return this.http.post<UserLoginResponse>('/api/auth/login', {userName, password})
      .toPromise()
      .then(responseBody => {
        if ('token' in responseBody) {
          this.token = responseBody.token;
          this.user = responseBody.user;
          localStorage.setItem('currentUser', JSON.stringify({
            token: this.token,
            user: responseBody.user
          }));
          return {token: this.token, user: responseBody.user};
        } else {
          throw new Error('couldn\'t find the token in the response');
        }
      });
  }

  async logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('currentUser');
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
