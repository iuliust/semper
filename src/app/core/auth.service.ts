import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

import { Apollo } from 'apollo-angular';

import { LocalStorageService } from './local-storage.service';
import { TokenExchangerService } from './token-exchanger.service';

import {
  UserRegistrationData,
  UserRegistrationResponse,
  UserLoginResponse,
  User
} from './_models';
import gql from 'graphql-tag';

@Injectable()
export class AuthService {
  auth$ = new BehaviorSubject<UserLoginResponse>(JSON.parse(this.localStorage.getItem('auth')) || {token: null, user: null});
  get token() { return this.auth$.value.token }
  get user() { return this.auth$.value.user }

  constructor(
    private http: HttpClient,
    private exchanger: TokenExchangerService,
    private localStorage: LocalStorageService,
    private apollo: Apollo,
  ) {
    this.auth$.subscribe(value => {
      if (value) {
        this.exchanger.set(value.token);
      }
    })
  }

  async registerNewUser(user: UserRegistrationData): Promise<UserLoginResponse> {
    try {
      return this.apollo.mutate({
        mutation: gql`
          mutation registerNewUser($username: String!, $email: String!, $password: String!) {
            createUser(username: $username, email: $email, password: $password) {
              token
              user {
                id
                username
                email
              }
            }
          }`,
        variables: user,
      })
      .toPromise()
      .then(response => {
        this.auth$.next(response.data.createUser);
        return response.data.createUser;
      });
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
          this.auth$.next(responseBody);
          return responseBody;
        } else {
          throw new Error('couldn\'t find the token in the response');
        }
      });
  }

  async logout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.auth$.next({token: null, user: null});
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
