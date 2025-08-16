import { apiClient } from '@/hooks/apiClient';
import { users } from '@/constants/endpoints';
import { StorageService } from '@/hooks/storage';

export async function getCurrentUserPermissions() {
  const token = await StorageService.getItem('token');
  const endpoint = users.getCurrentUserPermissions();
  const { data } = await apiClient.get(endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
}
