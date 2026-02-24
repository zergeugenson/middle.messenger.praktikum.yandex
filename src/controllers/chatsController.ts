import ChatsApi from '@/api/Chats';
import type { ChatListItemProps } from '@/types';

const chatsApi = new ChatsApi();

const getChats = async (): Promise<ChatListItemProps[]> => {
  const chatsRaw = await chatsApi.chats();

  const chats = chatsRaw.map((i: any) => ({
    ...i,
    last_message: i?.last_message
      ? {
        ...i?.last_message,
        time: new Date(i?.last_message?.time)?.toLocaleString?.(),
      }
      : undefined,
  }));

  window.store.set({ chats });
  return chats;
};

const addChat = async (form: any): Promise<any[]> => {
  await chatsApi.create(form);
  return getChats();
};

const getChatUsers = async (id: number): Promise<any[]> => {
  const users = await chatsApi.users(id);
  return users;
};

const deleteChat = async (data: any): Promise<any[]> => {
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

const userSearch = async (data: any): Promise<any> => {
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

const getToken = async (id: number): Promise<string> => {
  const response = await chatsApi.token(id);

  const chatToken = response.token;
  window.store.set({ chatToken });
  return chatToken;
};

export { getChats, addChat, getChatUsers, deleteChat, kickUserFromChat, userSearch, addUserToChat, getToken };
