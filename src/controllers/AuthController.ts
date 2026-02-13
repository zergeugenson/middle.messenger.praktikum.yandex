import AuthApi from '@/api/Auth'
import type { UserLoginForm } from '@/types'

const authApi = new AuthApi()

const login = async (data: UserLoginForm): Promise<void> => {
  await authApi.login(data)
}

export { login }
