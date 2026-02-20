import './style.scss';
import template from './activeChatWindow.hbs';
import Block from '@/framework/Block';
import { InputField } from '@/components/inputField';
import { RoundButton } from '@/components/roundButton';
import { getFormData } from '@/framework/utils';


class ActiveChatWindow extends Block {
  constructor(props: Record<string, any> = {}) {

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

    const init = () => {
      props = {
        ...props,
        events: {
          submit: this.onSubmit.bind(this),
        },
      };
      this.setProps({ ...props });
    };

    super({
      ...props,
      messageField,
      sendButton,
    });
    init();
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const isError = Object.values(this.children).filter(child=>(child instanceof InputField)).some(child=>child.isError);
    if (isError) return;
    const data = getFormData('send-message-form');
    const socket = window.store.getState().socket;
    socket.sendMessage(data.message.toString());
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ActiveChatWindow;
