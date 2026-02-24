import './style.scss';
import Block from '@/framework/Block';
import template from './chatMessage.hbs';

interface ChatMessageProps {
  chat_id: number;
  content: string;
  file?: unknown;
  id: number;
  is_read: boolean;
  time: string
  type: string
  user_id: number;
  mymessage?: boolean;
}

export default class ChatMessage extends Block {
  constructor(props: ChatMessageProps) {
    const usersInChat = window.store.getState().usersInChat;
    const userName = usersInChat?.filter((item: { id:number, name:string })=> item.id === props.user_id)[0].name || '';
    super({ ...props, userName });
  }

  render() {
    return this.compile(template, this.props);
  }
}

