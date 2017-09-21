import { Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../core/auth.service';
import { MdSnackBar } from '@angular/material';

interface LoginDto {
  userName: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'fi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginInfo: LoginDto = {
    userName: '',
    password: '',
  };
  loading = false;

  constructor(private http: HttpClient,
              private auth: AuthService,
              private snackBar: MdSnackBar,
              private router: Router) { }

  async authenticate(info: LoginDto) {
    try {
      this.loading = true;
      const authResponse = await this.auth.login(info.userName, info.password);
      this.snackBar.open('vous êtes à présent connecté', undefined, {
        duration: 2000,
      });
      this.router.navigate(['/']);
    } catch (err) {
      console.trace(err);
    } finally {
      this.loading = false;
    }
  }

}
