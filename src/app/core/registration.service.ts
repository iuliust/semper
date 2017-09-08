import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { UserRegistrationData } from './_models';

@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient) { }

  async registerNewUser(user: UserRegistrationData): Promise<UserRegistrationData> {
    try {
      const res = await this.http.post<UserRegistrationData>('api/user', user).toPromise();
      console.log('successful registration');
      return res;
    } catch (err) {
      if (err.error instanceof Error) {
        console.log('an error occured :', err.error.message);
      } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      return Promise.reject(err);
    }
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
