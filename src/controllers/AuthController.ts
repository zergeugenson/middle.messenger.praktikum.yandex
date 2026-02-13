import AuthApi from '@/api/Auth'
import type { UserLoginForm, UserData } from '@/types'

const authApi = new AuthApi()

const doLogin = async (data: UserLoginForm): Promise<Boolean> => {
  return await authApi.login(data);
}

const doLogout = async (): Promise<Boolean> => {
  return await authApi.logout();
}

const doRegister = async (data: UserLoginForm): Promise<Boolean> => {
  return await authApi.register(data);
}

const getUser = async (): Promise<UserData> => {
  const user = await authApi.user();
  window.store.set({ user });
  return user;
}

export { doLogin, getUser, doRegister, doLogout }
