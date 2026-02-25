import { HTTPTransport } from '@/framework/HTTPTransport';

const authApi = new HTTPTransport();

export default class UserApi {
  async profile(data: any): Promise<unknown> {
    return authApi.put('/user/profile', { data });
  }

  async avatar(data: any): Promise<unknown> {
    return authApi.put('/user/profile/avatar', { data });
  }

  async password(data: any): Promise<unknown> {
    return authApi.put('/user/password', { data });
  }
}
