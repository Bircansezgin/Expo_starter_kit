import { apiClient } from '@/hooks/apiClient';
import { users } from '@/constants/endpoints';
import { StorageService } from '@/hooks/storage';

export async function getUserById(id: number | string) {
  const token = await StorageService.getItem('token');
  const endpoint = users.getUserById(id);
  const { data } = await apiClient.get(endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
}

export async function getAllUsers() {
  const token = await StorageService.getItem('token');
  const endpoint = users.getAllUsers();
  const { data } = await apiClient.get(endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
}
