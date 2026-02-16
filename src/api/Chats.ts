import { HTTPTransport } from '@/framework/HTTPTransport';

const chatsApi = new HTTPTransport()

export default class ChatsApi {
  async chats(): Promise<any> {
    return await chatsApi.get('/chats')
  }
}
