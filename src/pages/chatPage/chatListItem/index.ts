import './style.scss';
import Block from '@/framework/Block';
import template from './chatListItem.hbs';
import { ucFirst } from '@/framework/utils';
import { ChatListItemProps } from '@/types';

export default class ChatListItem extends Block {
  constructor(props: ChatListItemProps) {

    const init = () => {
      if (props.title) {
        this.setProps({ title: ucFirst(props.title.toString()), avatarLetter: ucFirst(props.title.toString())[0] });
      }
    };
    super({ ...props,
      events: {
        click: () => {
          if (typeof props?.events?.click === 'function') {
            props.events.click();
          }
          this.setProps({ isSelectedChat: true });
          window.store.set({ selectedChat: props.chatID });
        },
      },
    });
    init();
  }

  render() {
    return this.compile(template, this.props);
  }
}

