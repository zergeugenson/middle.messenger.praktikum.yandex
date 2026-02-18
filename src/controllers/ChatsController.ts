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

const getToken = async (id: number): Promise<string> => {
  const response = await chatsApi.token(id);

  const chatToken = response.token;
  window.store.set({ chatToken });
  return chatToken;
};

export { getChats, getToken };
