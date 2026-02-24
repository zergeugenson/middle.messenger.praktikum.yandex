import './style.scss';
import Block from '@/framework/Block';
import template from './chatListItem.hbs';
import {ucFirst} from "@/framework/utils";

export default class ChatListItem extends Block {
  constructor(props: any) {

    const init = () => {
      console.log(this.props)
      this.setProps({title: ucFirst(props.title), avatarLetter: ucFirst(props.title)[0]})

    };
    super({ ...props,
      events: {
        click: (e: Event) => {
          if (typeof props?.events?.click === 'function') {
            props.events.click(e);
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

