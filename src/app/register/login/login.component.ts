import { Router } from '@angular/router';
import { AfterViewInit, Component, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../core/auth.service';
import { MatSnackBar } from '@angular/material';

interface LoginDto {
  username: string;
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
  // @Output() connectionSuccess  = new EventEmitter<any>();
  loginInfo: LoginDto = {
    username: '',
    password: '',
  };
  loading = false;

  constructor(private http: HttpClient,
              private auth: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  async submitCredentials(info: LoginDto) {
    try {
      this.loading = true;
      const authResponse = await this.auth.login(info.username, info.password);
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
