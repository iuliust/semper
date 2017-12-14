import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AuthService } from './core/auth.service';

import { ApiService } from './api.service';

@Component({
  selector: 'fi-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [
    trigger('titleState', [
      state('small', style({
        backgroundColor: '#eee',
        fontSize: '2em',
      })),
      state('big',   style({
        backgroundColor: '#cfd8dc',
        fontSize: '4em',
      })),
      transition('small => big', animate('100ms ease-in')),
      transition('big => small', animate('100ms ease-out'))
    ]),
  ],
})
export class AppComponent implements OnInit {

  title = 'hey';
  titleState = 'small';
  data = '';
  counter = 0;

  constructor(public auth: AuthService) {}

  ngOnInit() { }

  toggleTitleState() {
    if (this.titleState === 'small') {
      this.titleState = 'big';
    } else {
      this.titleState = 'small';
    }
  }

}
