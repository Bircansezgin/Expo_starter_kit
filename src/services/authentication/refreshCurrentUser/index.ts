import { apiClient } from '@/hooks/apiClient';
import { users } from '@/constants/endpoints';
import { StorageService } from '@/hooks/storage';

export type RefreshResponse = { accessToken: string };

export async function refreshCurrentUser(): Promise<RefreshResponse> {
  const token = await StorageService.getItem('token');
  const endpoint = users.refreshCurrentUser();
  const { data } = await apiClient.post<RefreshResponse>(endpoint, undefined, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (data?.accessToken) {
    await StorageService.setItem('token', data.accessToken);
  }
  return data;
}
