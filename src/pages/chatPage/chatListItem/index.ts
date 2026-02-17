import './style.scss';
import Block from '@/framework/Block';
import template from './chatListItem.hbs';

export default class ChatContact extends Block {
  constructor(props: { [key: string]: string }) {
    super('div', { ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

