import { HTTPTransport } from '@/framework/HTTPTransport';
import type { UserLoginForm } from '@/types';

const authApi = new HTTPTransport();

export default class AuthApi {

  async login(data: UserLoginForm): Promise<any> {
    return authApi.post('/signin', { data });
  }

  async logout(): Promise<any> {
    return authApi.post('/logout');
  }

  async user(): Promise<any> {
    return authApi.get('/user');
  }

  async register(data: UserLoginForm): Promise<any> {
    return authApi.post('/signup', { data });
  }
}
