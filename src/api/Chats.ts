import { HTTPTransport } from '@/framework/HTTPTransport';

const chatsApi = new HTTPTransport();

export default class ChatsApi {
  async chats(): Promise<any> {
    return chatsApi.get('/chats');
  }

  async token(id: number): Promise<any> {
    return chatsApi.post(`/chats/token/${id}`);
  }
}
