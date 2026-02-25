import AuthApi from '@/api/Auth';
import type { UserLoginForm, UserDataRequest, User } from '@/types';

const authApi = new AuthApi();

const doLogin = async (data: { [key: string]: FormDataEntryValue }): Promise<unknown> => {
  return authApi.login(data);
};

const doLogout = async (): Promise<unknown> => {
  window.store.set({ user: {} });
  window.store.set({ isAuthorized: false });
  return authApi.logout();
};

const doRegister = async (data: UserLoginForm): Promise<unknown> => {
  return authApi.register(data);
};

const getUser = async (): Promise<unknown> => {
  const userdata = await authApi.user() as UserDataRequest;
  const user: User = {
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
