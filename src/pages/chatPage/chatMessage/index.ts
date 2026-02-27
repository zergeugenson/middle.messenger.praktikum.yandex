import './style.scss';
import Block from '@/framework/Block';
import template from './chatMessage.hbs';
import { ChatMessageProps } from '@/types';


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

