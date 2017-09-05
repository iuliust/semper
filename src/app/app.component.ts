import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <md-toolbar color="primary">My App</md-toolbar>
    <h1>
      Welcome to {{title}}
    </h1>
    <p>{{data}}</p>
    <button (click)="counter = counter + 1">increment</button>
    <p>valeur du compteur : {{ counter }}</p>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  title = 'hey';
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

}
