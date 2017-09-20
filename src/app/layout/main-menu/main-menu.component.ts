import { Component, OnInit } from '@angular/core';

interface linkModel {
  label: string;
  path: string;
}

@Component({
  selector: 'fi-main-menu',
  templateUrl: './main-menu.component.html',
  styles: []
})
export class MainMenuComponent {
  links: linkModel[] = [
    { label: 'main', path: '/' },
    { label: 'register', path: '/register/register' },
    { label: 'login', path: '/register/login' },
  ];
}
