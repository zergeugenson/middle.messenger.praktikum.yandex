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

interface User {
  // [key: string]: string;
  avatar?: string;
  display_name?: string;
  email?: string;
  first_name?: string;
  id?: number;
  login?: string
  phone?: string;
  second_name?: string;
}

// 2DO разобраться с типами пропсов
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

export interface AppState {
  notValid: boolean;
  messages: any[];
  chats: any[];
  userList: any[];
  user: User;
  isAuthorized: boolean;
  chatToken: string | null;
  socket?: any;
  selectedChat: number;
  isUserSearchWindowOpen: Boolean;
}

export interface UserLoginForm {
  [key: string]: FormDataEntryValue;
}

export interface UserData {
  [key: string]: string;
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
