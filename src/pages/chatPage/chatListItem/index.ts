import './style.scss';
import Block from '@/framework/Block';
import template from './chatListItem.hbs';

export default class ChatListItem extends Block {
  constructor(props: any) {
    super({ ...props,
      events: {
        click: (e: Event) => {
          if (typeof props?.events?.click === 'function') {
            props.events.click(e);
          }
          this.setProps({ isSelectedChat: true});
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

