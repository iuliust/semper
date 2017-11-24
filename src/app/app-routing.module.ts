import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterModule' },
  { path: 'profile', loadChildren: './pages/profile-page/profile-page.module#ProfilePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
