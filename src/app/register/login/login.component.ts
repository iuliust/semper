import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  loginInfo: LoginDto = {
    userName: '',
    password: '',
  };
  loading: boolean;

  constructor(private http: HttpClient,
              private auth: AuthService,
              private snackBar: MdSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  async authenticate(info: LoginDto) {
    try {
      this.loading = true;
      const authResponse = await this.auth.login(info.userName, info.password);
      console.log(authResponse);
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
