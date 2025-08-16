import { apiClient } from '@/hooks/apiClient';
import { users } from '@/constants/endpoints';
import { StorageService } from '@/hooks/storage';

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  accessToken: string;
  user?: unknown;
};

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  const endpoint = users.register();
  const { data } = await apiClient.post<RegisterResponse>(endpoint, payload);
  if (data?.accessToken) {
    await StorageService.setItem('token', data.accessToken);
  }
  return data;
}
