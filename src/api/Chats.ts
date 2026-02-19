import { HTTPTransport } from '@/framework/HTTPTransport';

const chatsApi = new HTTPTransport();

export default class ChatsApi {
  async chats(): Promise<any> {
    return chatsApi.get('/chats');
  }

  async createchat(data: any): Promise<any> {
    return chatsApi.post('/chats', { data });
  }

  async token(id: number): Promise<any> {
    return chatsApi.post(`/chats/token/${id}`);
  }
}
