import Block from '@/framework/Block';

export interface Children {
  [key: string]: Block;
}

interface EventMap {
  [key: string]: EventListener | EventListenerObject;
}

interface Attributes {
  [key: string]: string;
}

export interface BlockProps {
  events?: EventMap;
  attr?: Attributes | false;
  template?: string;
  children?: unknown;
  onClick?: (event: Event) => void;
  onBlur?: (event: Event) => void;
  class?: string;
  [key:string]: unknown;
}

export interface User {
  avatar?: string;
  displayName?: string;
  email?: string;
  firstName?: string;
  id?: number;
  login?: string
  phone?: string;
  secondName?: string;
}

export interface AppState {
  messages: any[];
  chats: any[];
  userList: any[];
  user: User;
  isAuthorized: boolean;
  chatToken: string | null;
  socket?: any;
  selectedChat: number;
}

export interface UserLoginForm {
  [key: string]: FormDataEntryValue;
}

export interface ChatListItemProps {
  id: number;
  last_message: {
    content: string;
    time: string;
  };
  chatMessage: string;
  unread_count: number;
  avatar: any;
  title: string;
  events?: {
    click: () => void;
  };
}

export type PageTypes = any;
