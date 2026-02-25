import ChatsApi from '@/api/Chats';
import type { ChatListItemProps } from '@/types';
import { humanReadableTime } from '@/framework/utils';
import type { User } from '@/types';

const chatsApi = new ChatsApi();

const getChats = async (): Promise<ChatListItemProps[]> => {
  const chatsRaw = await chatsApi.chats() as User[];
  const chats = chatsRaw.map((i: any) => ({
    ...i,
    last_message: i?.last_message ? {
      ...i?.last_message,
      time: humanReadableTime(i?.last_message?.time),
    }
      : undefined,
  }));

  window.store.set({ chats });
  return chats;
};

const createChat = async (form: any): Promise<unknown> => {
  await chatsApi.create(form);
  return getChats();
};

const getChatUsers = async (id: number): Promise<unknown> => {
  const users = await chatsApi.users(id);
  return users;
};

const deleteChat = async (data: any): Promise<unknown> => {
  await chatsApi.delete(data);
  return getChats();
};

const kickUserFromChat = async (data: any): Promise<void> => {
  const { userId, chatId } = data;
  await chatsApi.remove({
    users: [userId],
    chatId: chatId,
  });
};

const userSearch = async (data: any): Promise<unknown> => {
  const search = await chatsApi.search(data);
  return search;
};

const addUserToChat = async (data: any): Promise<void> => {
  const { userId, chatId } = data;
  await chatsApi.add({
    users: [userId],
    chatId: chatId,
  });
};

const getToken = async (id: number): Promise<unknown> => {
  const response = await chatsApi.token(id) as { [key:string]:string };
  const chatToken = response.token;
  window.store.set({ chatToken });
  return chatToken;
};

export { getChats, createChat, getChatUsers, deleteChat, kickUserFromChat, userSearch, addUserToChat, getToken };
