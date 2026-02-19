import type { AppState } from '@/types';

class ChatWebSocket {
  private socket: WebSocket;

  protected token: string;

  protected ping: number | null;

  protected store: AppState;

  public openConnect(userId: number, chatId: number, token: string) {
    this.closeConnect();
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    this.socket.addEventListener('open', () => {
      this.getMessage();
      this.getOldMessages();
      this.ping = setInterval(() => {
        this.sendPing();
      }, 30000);
    });
  }

  private getMessage() {
    this.socket.addEventListener('message', (event) => {
      const parsedData = JSON.parse(event.data);
      if (Array.isArray(parsedData)) {
        window.store.set({ messages: parsedData.reverse() });
      } else {
        const previousMessages = window.store.getState().messages;
        if (Array.isArray(previousMessages) && parsedData.type === 'message') {
          window.store.set({ messages: [...previousMessages, parsedData] });
        }
      }
    });
  }

  public getOldMessages(offset: string = '0') {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          content: offset,
          type: 'get old',
        }),
      );
    }
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        content: message,
        type: 'message',
      }));
    }
  }

  public closeConnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  public sendPing() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          type: 'ping',
          content: '',
        }),
      );
    }
  }

  private error() {
    this.socket.addEventListener('error', (event) => {
      console.error('Ошибка', event);
    });
  }
}

export { ChatWebSocket };
