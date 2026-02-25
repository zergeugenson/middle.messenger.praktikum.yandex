import { HTTPTransport } from '@/framework/HTTPTransport';
import type { User } from '@/types';

const authApi = new HTTPTransport();

export default class UserApi {
  async profile(data: User): Promise<unknown> {
    return authApi.put('/user/profile', { data });
  }

  async avatar(data: FormData): Promise<unknown> {
    return authApi.put('/user/profile/avatar', { data });
  }

  async password(data: { oldPassword: string, newPassword: string }): Promise<unknown> {
    return authApi.put('/user/password', { data });
  }
}
