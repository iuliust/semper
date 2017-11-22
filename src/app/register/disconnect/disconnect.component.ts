import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Component, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'fi-disconnect',
  templateUrl: './disconnect.component.html',
  styleUrls: ['./disconnect.component.scss']
})
export class DisconnectComponent implements AfterViewInit {
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  async ngAfterViewInit() {
    try {
      this.loading = true;
      const done = await this.auth.logout();
      this.snackBar.open('déconnexion réussie', undefined, {
        duration: 2000,
      });
    } catch (err) {
      this.snackBar.open('la déconnexion a échoué');
      console.trace(err);
    } finally {
      this.router.navigate(['/']);
      this.loading = false;
    }
  }

}