import './style.scss';
import template from './activeChatWindow.hbs';
import Block from '@/framework/Block';
import { InputField } from '@/components/inputField';
import { RoundButton } from '@/components/roundButton';

class ActiveChatWindow extends Block {
  constructor(props: Record<string, any> = {}) {

    // const messageList = [];
    const messageField = new InputField({
      id: 'message-field',
      name: 'message',
      type: 'text',
      disabled: false,
      placeholder: 'Сообщение',
      pattern: /.+/,
      errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
      value: '',
    });

    const sendButton = new RoundButton({
      id: 'message-send',
      type: 'submit',
      disabled: false,
    });

    super({
      ...props,
      messageField,
      sendButton,
      // messageList,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ActiveChatWindow;
