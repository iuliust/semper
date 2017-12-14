import { Component, Input } from '@angular/core';

@Component({
  selector: 'fi-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  @Input() color = 'primary';
}
