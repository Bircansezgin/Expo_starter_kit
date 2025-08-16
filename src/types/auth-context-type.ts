import { User } from "./user-type";
import { LoginCredentials, RegisterData } from "./Auth";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}