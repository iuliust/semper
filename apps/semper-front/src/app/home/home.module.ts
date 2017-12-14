import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'app/shared';

import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'all-users', component: UserListComponent },
];

@NgModule({
  imports: [ SharedModule, RouterModule.forChild(routes) ],
  declarations: [ HomeComponent, UserListComponent ],
  exports: [],
})
export class HomeModule { }
