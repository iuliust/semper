export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
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
