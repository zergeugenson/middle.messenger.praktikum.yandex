import UserApi from '@/api/User';
import type { User } from '@/types';
const userApi = new UserApi();

const changeUserProfile = async (data: User): Promise<unknown> => {
  const user = await userApi.profile(data) as User;
  window.store.set({ user });
  return user;
};

const changeUserAvatar = async ({ file }: { file: File }): Promise<unknown> => {
  const res = new FormData();
  res.append('avatar', file);
  const user = await userApi.avatar(res) as User;
  window.store.set({ user });
  return user;
};

const changeUserPassword = async (data: { oldPassword: string, newPassword: string }): Promise<unknown> => {
  return userApi.password(data);
};

export { changeUserProfile, changeUserAvatar, changeUserPassword };
