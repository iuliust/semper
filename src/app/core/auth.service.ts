import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

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
  auth$: BehaviorSubject<UserLoginResponse>;
  get token() { return this.auth$.value.token }
  get user() { return this.auth$.value.user }

  constructor(
    private http: HttpClient,
    private exchanger: TokenExchangerService,
    private localStorage: LocalStorageService,
    private apollo: Apollo,
  ) {
    const currentAuth = this.localStorage.getItem('auth');
    this.auth$ = new BehaviorSubject<UserLoginResponse>(currentAuth ? JSON.parse(currentAuth) : {token: null, user: null});
    this.auth$.subscribe(value => {
      if (value) {
        this.localStorage.setItem('auth', JSON.stringify(value));
        this.exchanger.set(value.token);
      }
    });
  }

  registerNewUser(user: UserRegistrationData): Observable<UserLoginResponse> {
    return this.apollo.mutate({
      mutation: gql`
        mutation registerNewUser($username: String!, $email: String!, $password: String!) {
          createUser(username: $username, email: $email, password: $password) {
            token
            user { id username email }
          }
        }`,
      variables: user,
    })
    .first()
    .map(response => {
      this.auth$.next(response.data.createUser);
      return response.data.createUser;
    });
  }

  login(username: string, password: string): Observable<UserLoginResponse> {
    return this.apollo.query<{login: UserLoginResponse}>({
      query: gql`
        query($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
            user { id username email }
          }
        }
      `,
      variables: {username, password}
    })
    .first()
    .map(response => {
      this.auth$.next(response.data.login);
      return response.data.login;
    });
  }

  logout() {
    return this.auth$.next({token: null, user: null});
  }

  deleteAccount(id: string): Observable<boolean> {
    return this.apollo.mutate({
      mutation: gql`mutation deleteUser($id: Int!) {
        deleteUser(id: $id) {}
      }`
    });
  }

}
