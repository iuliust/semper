import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <md-toolbar color="primary">My App</md-toolbar>
    <h1 [@titleState]="titleState" (click)="toggleTitleState()">
      Welcome to {{title}} !
    </h1>
    <p>{{data}}</p>
    <button (click)="counter = counter + 1">increment</button>
    <p>valeur du compteur : {{ counter }}</p>
    <router-outlet></router-outlet>
  `,
  styles: [],
  animations: [
    trigger('titleState', [
      state('small', style({
        backgroundColor: '#eee',
        'font-size': '2em'
      })),
      state('big',   style({
        backgroundColor: '#cfd8dc',
        'font-size': '4em'
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

  constructor(protected apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData()
      .subscribe((response) => {
        this.data = response.data;
      }, (error) => {
        this.data = 'Error with HTTP request';
      });
  }

  toggleTitleState() {
    if (this.titleState === 'small') {
      this.titleState = 'big';
    } else {
      this.titleState = 'small';
    }
  }

}
