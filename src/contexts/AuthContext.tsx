import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  LoginCredentials, RegisterData } from '@/types/Auth';
import { User } from '@/types/user-type';
import { AuthContextType } from '@/types/auth-context-type';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Auth loading error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate successful login for starter kit
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
        };
        
      const mockToken = 'demo-token-123';
      
      setToken(mockToken);
      setUser(mockUser);
      
      await AsyncStorage.setItem('token', mockToken);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      
      const mockToken = 'demo-token-123';
      const mockUser: User = {
        id: '1',
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
      };
      setToken(mockToken);
      setUser(mockUser);
      
      await AsyncStorage.setItem('token', mockToken);
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      
      return true;
    } catch (error: any) {
      console.error('Register error:', error);
      setError(error.message || 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      setUser(null);
      setError(null);
      
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;

      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      
      return true;
    } catch (error: any) {
      console.error('Profile update error:', error);
      setError(error.message || 'Profile update failed');
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    register,
    updateProfile,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth hook must be used within AuthProvider');
  }
  return context;
};
