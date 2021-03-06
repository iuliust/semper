import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatListModule } from '@angular/material';

import { NavbarComponent } from './navbar/navbar.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    RouterModule,
  ],
  declarations: [
    NavbarComponent,
    MainMenuComponent,
    MainContentComponent,
    FooterComponent
  ],
  exports: [
    NavbarComponent,
    MainMenuComponent,
    MainContentComponent,
    FooterComponent,
  ],
})
export class LayoutModule { }
