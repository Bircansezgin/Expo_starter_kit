import { apiClient } from '@/hooks/apiClient';
import { users } from '@/constants/endpoints';

export async function forgotPassword(email: string) {
  const endpoint = users.forgotPassword();
  const { data } = await apiClient.post(endpoint, { email });
  return data;
}
