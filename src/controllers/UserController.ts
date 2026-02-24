import UserApi from '@/api/User';

const userApi = new UserApi();

const changeUserProfile = async (data: any): Promise<void> => {
  const user = await userApi.profile(data);
  window.store.set({ user });
  return user;
};

const changeUserAvatar = async (file: File): Promise<void> => {
  const res = new FormData();
  res.append('avatar', file);
  const user = await userApi.avatar(res);
  window.store.set({ user });
  return user;
};

const changeUserPassword = async (data: any): Promise<void> => {
  return await userApi.password(data);
};

export { changeUserProfile, changeUserAvatar, changeUserPassword };
