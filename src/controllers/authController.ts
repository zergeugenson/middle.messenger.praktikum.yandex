import AuthApi from '@/api/Auth';
import type { UserLoginForm, User } from '@/types';

const authApi = new AuthApi();

const doLogin = async (data: { login: string, password: string }): Promise<boolean> => {
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

const getUser = async (): Promise<User> => {
  const userdata = await authApi.user();
  const user = {
    avatar: userdata.avatar,
    id: userdata.id,
    displayName: userdata.display_name,
    email: userdata.email,
    firstName: userdata.first_name,
    login: userdata.login,
    phone: userdata.phone,
    secondName: userdata.second_name,
  };
  if (user?.id) {
    window.store.set({ isAuthorized: true });
    window.store.set({ user });
  }
  return user;
};

export { doLogin, getUser, doRegister, doLogout };
