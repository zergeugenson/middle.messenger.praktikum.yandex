import './style.scss';
import template from './activeChatWindow.hbs';
import Block from '@/framework/Block';
import { InputField } from '@/components/inputField';
import { RoundButton } from '@/components/roundButton';
import {SubmitButton} from "@/components/submitButton";
import Popup from '@/components/popUp';
import { showPopup, getFormData, hidePopup } from '@/framework/utils';
import { getChatUsers, deleteChat } from "@/controllers/ChatsController";

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

    const activeChatButtons = [
      new SubmitButton({
        text: 'Добавить пользователя',
        events: {
          click: () => hidePopup(this.children.addChatPopUp.element),
        },
      }),
      new SubmitButton({
        text: 'Выгнать пользователя',
        events: {
          click: () => hidePopup(this.children.addChatPopUp.element),
        },
      }),
      new SubmitButton({
        text: 'Удалить чат',
        events: {
          click: () => {
            showPopup({ popupId: 'delete-chat-popup-id' });
          },
        },
      }),
    ];


    const addUserToChatPopUp = new Popup({
      formId: 'add-user-form-id',
      popupId: 'add-user-popup-id',
      title: 'Добавить пользователя?',
      needPropsUpdate: true,
    });

    const kickUserFromChatPopUp = new Popup({
      formId: 'kick-user-id',
      popupId: 'kick-user-popup-id',
      title: 'Выгнать пользователя?',
      needPropsUpdate: true,
    });

    const deleteChatPopUp = new Popup({
      formId: 'delete-chat-form-id',
      popupId: 'delete-chat-popup-id',
      title: 'Удалить чат?',
      needPropsUpdate: true,
      buttons: [
        new SubmitButton({
          text: 'Закрыть',
          events: {
            click: () => hidePopup(this.children.deleteChatPopUp.element),
          },
        }),
        new SubmitButton({
          text: 'Удалить',
          events: {
            click: (e: Event) => this.doDeleteChat(e),
          },
        }),
      ],
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
      activeChatButtons,
      addUserToChatPopUp,
      kickUserFromChatPopUp,
      deleteChatPopUp,
    });
    init();
  }

  doDeleteChat(e: Event) {
    e.preventDefault();
    const { selectedChat } = window.store.getState()
    if(!selectedChat) return;
    void deleteChat({chatId: selectedChat});
    this.setProps({ selectedChat: 0 });
  }

  doDeleteUser(e:Event) {
    e.preventDefault();

    console.log(window.store.getState().selectedChat)



    const { selectedChat, user } = window.store.getState()




    const userId = user.id;
    if (selectedChat) {
      getChatUsers(selectedChat).then((response) => {

        console.log("resp", response)
        return
            const foundUsers = JSON.parse(response.response);
            const withoutСurrentUser = foundUsers.filter(
                (user: any) => user.id !== userId
            );
            window.store.set("foundUsersDelete", withoutСurrentUser);
          });
    }

    showPopup({ popupId: 'delete-chat-popup-id' });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const isError = Object.values(this.children).filter(child=>(child instanceof InputField)).some(child=>child.isError);
    if (isError) return;
    const form:HTMLElement = document.getElementById('send-message-form')! as HTMLFormElement;
    const formData = new FormData(form as HTMLFormElement);
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => data[key] = value.toString());
    const socket = window.store.getState().socket;
    socket.sendMessage(data.message);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ActiveChatWindow;
