import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';

import { UserRegistrationData } from '../../core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'fi-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public model: UserRegistrationData = {
    username: '',
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  async createNewUser(user: UserRegistrationData) {
    try {
      await this.authService.registerNewUser(user);
      this.snackbar.open('Compte créé avec succès 🚀', undefined, {
        duration: 2000,
      });
      this.router.navigate(['/']);
    } catch (err) {
      console.trace(err);
    }
  }
}
