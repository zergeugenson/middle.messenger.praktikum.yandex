import Block from '@/framework/Block';
import type * as Pages from '@/pages/index'

export interface Children {
  [key: string]: Block;
}

interface EventMap {
  [key: string]: EventListener | EventListenerObject;
}

interface Attributes {
  [key: string]: string;
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

export type PageTypes = (typeof Pages)[keyof typeof Pages]
