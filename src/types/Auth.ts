// Exapand this interface with the response of the login and register endpoints

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}


