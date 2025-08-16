import { StorageService } from '@/hooks/storage';

export async function logout(): Promise<void> {
  await StorageService.removeItem('token');
}
