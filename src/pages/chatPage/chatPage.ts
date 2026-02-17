import './style.scss';
import Block from '@/framework/Block';
import { InputField } from '@/components/inputField';
// import { RoundButton } from '@/components/roundButton';
import template from './chatPage.hbs';
import { connect } from '@/framework/connect';
import { getChats } from '@/controllers/ChatsController';
import Sidebar from './sidebar';
import { StoreEvents } from '@/Store';
import ChatListItem from './chatListItem';
import type { ChatListItemProps } from '@/types';

class ChatPage extends Block {
  constructor(props: Record<string, any> = {}) {

    const sidebar = new Sidebar();
    const onSubmit = (e: Event) => {
      e.preventDefault();
      const isError = Object.values(this.children).filter(child=>(child instanceof InputField)).some(child=>child.isError);
      if (isError) return;
      const form:HTMLElement = document.getElementById('send-message-form')!;
      const formData = new FormData(form as HTMLFormElement);
      const data: { [key: string]: FormDataEntryValue } = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      console.log('Form Data:', data);
    };

    // const messageField = new InputField({
    //   id: 'message-field',
    //   name: 'message',
    //   type: 'text',
    //   disabled: false,
    //   placeholder: 'Сообщение',
    //   pattern: /.+/,
    //   errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
    //   value: '',
    // });
    //
    // const roundButton = new RoundButton({
    //   id: 'message-send',
    //   type: 'submit',
    //   disabled: false,
    // });

    const init = () => {
      props = {
        ...props,
        events: {
          submit: onSubmit.bind(this),
        },
      };
    };

    super('template', { ...props, sidebar });
    init();
    void getChats();


    window.store.on(StoreEvents.Updated, () => {
      const chatList: any[] = [];
      const { chats } = window.store.getState();

      chats?.forEach(
        (element: ChatListItemProps) => {
          chatList.push(
            new ChatListItem({
              title: element.title,
              unread_count: element.unread_count,
              id: element.id,
              chatMessage: element.last_message?.content || '',
              time: element.last_message?.time || '',
            }),
          );
        });
      sidebar.setProps({
        chatList: chatList,
      });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default connect(({ notValid, user }) => ({ notValid, user }))(ChatPage);
