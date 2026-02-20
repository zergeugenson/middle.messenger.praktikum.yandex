import './style.scss';
import Block from '@/framework/Block';
import template from './userListItem.hbs';
import {Link} from "@/components/iLink";
import { kickUserFromChat } from "@/controllers/ChatsController";
import Popup from "@/components/popUp";
import {SubmitButton} from "@/components/submitButton";
import {hidePopup, showPopup} from "@/framework/utils";

interface UserListItemProps {
  userLogin: string;
  userName: string;
  onclick: Function;
  userID: number;
}

export default class UserListItem extends Block {
  constructor(props: UserListItemProps) {
    const notMe = window.store.getState().user.id !== props.userID;
    const deleteUser = new Link({
      image: '/images/delete.png',
      alt: 'Выгнать',
      events: {
        click: (e: Event) => {
          e.preventDefault();
          showPopup({ popupId: 'kick-user-popup-id' });
        },
      },
    });
    const kickUserFromChatPopUp = new Popup({
      formId: 'kick-user-id',
      popupId: 'kick-user-popup-id',
      title: 'Выгнать пользователя?',
      buttons: [
        new SubmitButton({
          text: 'Отменить',
          events: {
            click: () =>
              hidePopup(this.children.kickUserFromChatPopUp.element)
          },
        }),
        new SubmitButton({
          text: 'Выгнать',
          events: {
            click: () => this.doDeleteUser(props),
          },
        }),
      ],
    });
    super({
      ...props,
      deleteUser,
      kickUserFromChatPopUp,
      notMe
    });
  }

  doDeleteUser(props:UserListItemProps) {
    const { selectedChat } = window.store.getState();
    kickUserFromChat({
      chatId: selectedChat,
      userId: props.userID
    }).then(() => {
      props.onclick();
    })
  }

  render() {
    return this.compile(template, this.props);
  }
}

