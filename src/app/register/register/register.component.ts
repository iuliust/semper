import { Component } from '@angular/core';
import { RegistrationService } from '../../core/registration.service';

import { UserRegistrationData } from '../../core';

@Component({
  selector: 'fi-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public model: UserRegistrationData = {
    userName: '',
    emailAddress: '',
    password: '',
  };

  constructor(private registrationService: RegistrationService) { }

  async saveUser(user: UserRegistrationData): Promise<UserRegistrationData> {
    return this.registrationService.registerNewUser(user);
  }
}
