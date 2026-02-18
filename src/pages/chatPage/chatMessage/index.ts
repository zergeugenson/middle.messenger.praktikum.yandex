import './style.scss';
import Block from '@/framework/Block';
import template from './chatMessage.hbs';

export default class ChatMessage extends Block {
  constructor(props: any) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

