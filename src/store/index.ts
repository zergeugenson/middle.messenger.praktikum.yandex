import EventBus from '@/framework/EventBus';
import { AppState } from '@/types';

export enum StoreEvents {
  Updated = 'Updated',
}

export const initState: AppState = {
  notValid: false,
  user: {},
  messages: [],
  chats: [],
  isAuthorized: false,
  chatToken: null,
  socket: null,
  selectedChat: 0,
};

export class Store<State extends Record<string, any>> extends EventBus {
  private state: State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }

  public getState(): State {
    return this.state;
  }

  public set(nextState: Partial<State>): void {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
