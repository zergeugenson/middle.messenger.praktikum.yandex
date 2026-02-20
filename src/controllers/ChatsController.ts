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
  return chatsApi.users(id);
};

const deleteChat = async (data: any): Promise<any[]> => {
  await chatsApi.delete(data);
  return getChats();
};

const kickUserFromChat = async (data: any): Promise<void> => {
    await chatsApi.remove({
      users: [data.userId],
      chatId: data.chatId
    })
}

const getToken = async (id: number): Promise<string> => {
  const response = await chatsApi.token(id);

  const chatToken = response.token;
  window.store.set({ chatToken });
  return chatToken;
};

export { getChats, addChat, getChatUsers, deleteChat, kickUserFromChat, getToken };
