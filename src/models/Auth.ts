export interface ChangePassword {
  password: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}