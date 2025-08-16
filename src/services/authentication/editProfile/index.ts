import { apiClient } from '@/hooks/apiClient';
import { users } from '@/constants/endpoints';
import { StorageService } from '@/hooks/storage';

export type EditProfilePayload = Record<string, unknown>;

export async function editProfile(payload: EditProfilePayload) {
  const token = await StorageService.getItem('token');
  const endpoint = users.editProfile();
  const { data } = await apiClient.put(endpoint, payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
}
