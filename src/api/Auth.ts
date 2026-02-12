import { HTTPTransport } from '@/framework/HTTPTransport'

const authApi = new HTTPTransport()

export interface UserLoginForm {
  login: string
  password: string
}

export default class AuthApi {

  async login(data: UserLoginForm): Promise<any> {
    return await authApi.post('/signin', { data })
  }

}
