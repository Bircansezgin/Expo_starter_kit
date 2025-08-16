import { apiClient } from '@/hooks/apiClient';
import { users } from '@/constants/endpoints';
import { StorageService } from '@/hooks/storage';

export async function changePassword(currentPassword: string, newPassword: string) {
  const token = await StorageService.getItem('token');
  const endpoint = users.changePassword();
  const { data } = await apiClient.post(endpoint, { currentPassword, newPassword }, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
}
