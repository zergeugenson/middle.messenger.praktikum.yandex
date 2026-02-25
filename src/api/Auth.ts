import { HTTPTransport } from '@/framework/HTTPTransport';
import type { UserLoginForm } from '@/types';

const authApi = new HTTPTransport();

export default class AuthApi {

  async login(data: UserLoginForm): Promise<unknown> {
    return authApi.post('/auth/signin', { data });
  }

  async logout(): Promise<unknown> {
    return authApi.post('/auth/logout');
  }

  async user(): Promise<unknown> {
    return authApi.get('/auth/user');
  }

  async register(data: UserLoginForm): Promise<unknown> {
    return authApi.post('/auth/signup', { data });
  }
}
