export interface User {
  username: string;
  email: string;
}

export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginResponse {
  token: string;
  user: User;
}

export interface UserRegistrationResponse {
  token: string;
  user?: any;
  error?: string;
}
