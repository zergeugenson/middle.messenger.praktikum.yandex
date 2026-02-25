import { HTTPTransport } from '@/framework/HTTPTransport';

const chatsApi = new HTTPTransport();

export default class ChatsApi {
  async chats(): Promise<any> {
    return chatsApi.get('/chats');
  }

  async create(data: any): Promise<unknown> {
    return chatsApi.post('/chats', { data });
  }

  async delete(data: object): Promise<unknown> {
    return chatsApi.delete('/chats', { data });
  }

  async users(id: number): Promise<unknown> {
    return chatsApi.get(`/chats/${id}/users`);
  }

  async add(data: any): Promise<unknown> {
    return chatsApi.put('/chats/users', { data });
  }

  async remove(data: any): Promise<unknown> {
    return chatsApi.delete('/chats/users', { data });
  }

  async search(data: any): Promise<unknown> {
    return chatsApi.post('/user/search', { data });
  }

  async token(id: number): Promise<unknown> {
    return chatsApi.post(`/chats/token/${id}`);
  }
}
