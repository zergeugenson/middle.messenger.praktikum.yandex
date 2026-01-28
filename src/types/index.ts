
// interface EventMap {
//     [key: string]: EventListener | EventListenerObject;
// }
//
interface Attributes {
  [key: string]: string;
}


// 2DO разобраться с типами пропсов
export interface BlockProps {
  // events?: EventMap;
  attr?: Attributes | false;
  template?: string;
  [key:string]: any;
  children?: any;
}

