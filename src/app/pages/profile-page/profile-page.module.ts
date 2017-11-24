import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfilePageComponent } from 'app/pages/profile-page/profile-page.component';
import { SharedModule } from 'app/shared';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProfilePageComponent }])
  ],
  declarations: [ProfilePageComponent]
})
export class ProfilePageModule { }
