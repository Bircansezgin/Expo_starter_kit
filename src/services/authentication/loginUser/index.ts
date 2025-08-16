import { apiClient } from '@/hooks/apiClient';
import { users } from '@/constants/endpoints';
import { StorageService } from '@/hooks/storage';

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user?: unknown;
};

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const endpoint = users.login();
  const { data } = await apiClient.post<LoginResponse>(endpoint, payload);
  if (data?.accessToken) {
    await StorageService.setItem('token', data.accessToken);
  }
  return data;
}
