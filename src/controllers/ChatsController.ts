import ChatsApi from '@/api/chats';
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
  return await chatsApi.users(id)
}

const deleteChat = async (data: any): Promise<any[]> => {
  await chatsApi.delete(data)
  return await getChats()
}

const getToken = async (id: number): Promise<string> => {
  const response = await chatsApi.token(id);

  const chatToken = response.token;
  window.store.set({ chatToken });
  return chatToken;
};

export { getChats, addChat, getChatUsers, deleteChat, getToken };
