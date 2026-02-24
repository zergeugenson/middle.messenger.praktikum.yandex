import { HTTPTransport } from '@/framework/HTTPTransport';

const authApi = new HTTPTransport();

export default class UserApi {
  async profile(data: any): Promise<any> {
    return authApi.put('/user/profile', { data });
  }

  async avatar(data: any): Promise<any> {
    return authApi.put('/user/profile/avatar', { data });
  }

  async password(data: any): Promise<any> {
    return authApi.put('/user/password', { data });
  }
}
