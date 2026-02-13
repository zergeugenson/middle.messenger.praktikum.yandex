import { HTTPTransport } from '@/framework/HTTPTransport'
import type { UserLoginForm } from '@/types'

const authApi = new HTTPTransport()

export default class AuthApi {

  async login(data: UserLoginForm): Promise<any> {
    return await authApi.post('/signin', { data })
  }

  async user(): Promise<any> {
    return await authApi.get('/user')
  }

}
