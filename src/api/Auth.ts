import { HTTPTransport } from '@/framework/HTTPTransport';
import type { UserLoginForm } from '@/types';

const authApi = new HTTPTransport();

export default class AuthApi {

  async login(data: UserLoginForm): Promise<any> {
    return authApi.post('/auth/signin', { data });
  }

  async logout(): Promise<any> {
    return authApi.post('/auth/logout');
  }

  async user(): Promise<any> {
    return authApi.get('/auth/user');
  }

  async register(data: UserLoginForm): Promise<any> {
    return authApi.post('/auth/signup', { data });
  }
}
