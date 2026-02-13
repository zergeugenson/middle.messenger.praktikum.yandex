import AuthApi from '@/api/Auth';
import type { UserLoginForm, UserData } from '@/types';

const authApi = new AuthApi();

const doLogin = async (data: UserLoginForm): Promise<boolean> => {
  return authApi.login(data);
};

const doLogout = async (): Promise<boolean> => {
  window.store.set({ user: {} });
  window.store.set({ isAuthorized: false });
  return authApi.logout();
};

const doRegister = async (data: UserLoginForm): Promise<boolean> => {
  return authApi.register(data);
};

const getUser = async (): Promise<UserData> => {
  const user = await authApi.user();
  if (user?.id) {
    window.store.set({ isAuthorized: true });
    window.store.set({ user });
  }
  return user;
};

export { doLogin, getUser, doRegister, doLogout };
