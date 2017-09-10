import { Component } from '@angular/core';

type Genre = 'f' | 'm';

@Component({
  selector: 'fi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  genre: Genre = 'm';

  male() {
    this.genre = 'm';
  }

  female() {
    this.genre = 'f';
  }
}
