import './style.scss';
import Block from '@/framework/Block';
import { ChatWebSocket } from '@/framework/ChatWebSocket';
import template from './chatPage.hbs';
import { connect } from '@/framework/connect';
import { addChat, deleteChat, getChats, getChatUsers, getToken } from '@/controllers/ChatsController';
import Sidebar from './sidebar';
import ActiveChatWindow from './activeChatWindow';
import ChatMessage from './chatMessage';
import { StoreEvents } from '@/Store';
import ChatListItem from './chatListItem';
import UserListItem from './userListItem';
import type { ChatListItemProps } from '@/types';
import defaulAvatar from '@/assets/images/defaultUserAvatar.svg';
import type { AppState } from '@/types';
import { humanReadableTime, showPopup, getFormData, hidePopup } from '@/framework/utils';
import { SubmitButton } from '@/components/submitButton';
import { appRouter } from '@/main';
import Popup from '@/components/popUp';
import { InputField } from '@/components/inputField';

class ChatPage extends Block {
  constructor(props: Record<string, any> = {}) {

    const socket = new ChatWebSocket();
    window.store.set({ socket: socket });

    const sidebar = new Sidebar();

    const activeChatWindow = new ActiveChatWindow();

    const addChatButton = new SubmitButton({
      class: 'create-chat',
      text: 'Создать чат',
      type: 'button',
      events: {
        click: () => {
          showPopup({ popupId: 'add-chat-popup-id' });
        },
      },
    });

    const viewProfile = new SubmitButton({
      class: 'user-profile',
      text: 'Профиль',
      type: 'button',
      events: {
        click: () => {
          appRouter.go('/profile');
        },
      },
    });

    const activeChatButtons = [
      new SubmitButton({
        text: 'Добавить пользователя',
        events: {
          click: () => showPopup({ popupId: 'add-user-popup-id' }),
        },
      }),
      new SubmitButton({
        text: 'Удалить чат',
        events: {
          click: () => {
            if (!window.store.getState().selectedChat) return;
            showPopup({ popupId: 'delete-chat-popup-id' });
          },
        },
      }),
    ];

    const addChatPopUp = new Popup({
      formId: 'add-chat-form-id',
      popupId: 'add-chat-popup-id',
      title: 'Создать новый чат',
      inputs: [
        new InputField({
          name: 'title',
          placeholder: 'Название нового чата',
        }),
      ],
      buttons: [
        new SubmitButton({
          text: 'Закрыть',
          events: {
            click: () => hidePopup(this.children.addChatPopUp.element),
          },
        }),
        new SubmitButton({
          text: 'Создать',
          events: {
            click: () => this.doAddChat(),
          },
        }),
      ],
    });

    const addUserToChatPopUp = new Popup({
      formId: 'add-user-form-id',
      popupId: 'add-user-popup-id',
      title: 'Добавить пользователя?',
    });

    const deleteChatPopUp = new Popup({
      formId: 'delete-chat-form-id',
      popupId: 'delete-chat-popup-id',
      title: 'Удалить чат?',
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
            click: () => this.doDeleteChat(),
          },
        }),
      ],
    });

    const init = () => {
      props = {
        ...props,
      };
      getChats().then(()=> {
        this.setChatsList();
      });
      this.setProps({ ...props });
    };
    super({
      ...props,
      addChatButton,
      viewProfile,
      addChatPopUp,
      sidebar,
      activeChatWindow,
      activeChatButtons,
      addUserToChatPopUp,
      deleteChatPopUp,
    });
    window.store.on(StoreEvents.Updated, this.onStoreUpdate.bind(this));
    init();
  }

  /**
 * Действия со списком чатов
 */
  setChatsList() {
    const chatList: any[] = [];
    const { chats } = window.store.getState();
    const { sidebar } = this.children;
    chats?.forEach(
      (item: ChatListItemProps) => {
        chatList.push(
          new ChatListItem({
            title: item.title,
            unread_count: item.unread_count,
            chatID: item.id,
            chatMessage: item.last_message?.content || '',
            time: item.last_message?.time || '',
            isSelectedChat: false,
            events: {
              click: () => {
                chatList.forEach(contact => {
                  contact.setProps({ isSelectedChat: false });
                });
                this.setProps({
                  avatarImg: defaulAvatar,
                  chatName: item.title,
                  chatId: item.id,
                });
                this.getChatMessages(item.id);
                this.doGetUserList(item.id);
              },
            },
          }),
        );
      });
    sidebar.setProps({
      chatList: chatList,
    });
  }

  doAddChat() {
    const popup = this.children.addChatPopUp.element;
    const { title } = getFormData('add-chat-form-id');
    if (title) {
      void addChat({ title }).then( (result) => {
        console.log('AddChatResult', result, this.children);
        hidePopup(popup);
        const formElement = document.getElementById('add-chat-form-id') as HTMLFormElement;
        formElement.reset();
        this.setChatsList();
      });
    }
  }

  doDeleteChat() {
    const { selectedChat } = window.store.getState();
    void deleteChat({ chatId: selectedChat }).then(()=>{
      this.setProps({ selectedChat: 0 });
      hidePopup(this.children.deleteChatPopUp.element);
      this.setChatsList();
    });
  }

  /**
 * Действия со списком сообщений
 */

  getChatMessages(chatID: number) {
    if (chatID) {
      void getToken(chatID)
        .then((chatToken) => {
          const { user } = window.store.getState();
          const userId = user.id;
          if (chatID && chatToken && userId) {
            const socket = window.store.getState().socket;
            socket.openConnect( userId, chatID, chatToken );
          }
        });
    }
  }

  onStoreUpdate() {
    const state = window.store.getState();
    const messageList = this.getMessageListFromProps(state);
    this.children.activeChatWindow.setProps({
      ...this.props,
      messageList: messageList.length > 0 ? messageList : [],
      messagesListLen: messageList.length,
    });
    document.getElementById('messages-field-container')?.scrollTo({ top: 10000 });
  }

  getMessageListFromProps(props: AppState) {
    return (
      props.messages?.map((messageItem: any) => (
        new ChatMessage({
          ...messageItem,
          user: props.user,
          time: humanReadableTime(messageItem.time),
          mymessage: messageItem.user_id === window.store.getState()?.user?.id,
        })
      )) || []
    );
  }

  /**
 * Действия со списком пользователей
 */

  async doGetUserList(id:number) {
    const userList: any = [];
    const res = await getChatUsers(id)
    res?.forEach(
        (item: any) => {
          userList.push(
              new UserListItem({
                userID: item.id,
                userLogin: item.login,
                userName: item.first_name,
                onclick: ():void => {
                  void getChats().then(()=> {
                    this.setChatsList();
                  });
                  this.doGetUserList(id).then(()=>{
                    this.setProps({ ...this.props });
                    console.log("Выполняется в контексте: ", this)
                  })
                },
              }),
          );
        });
    this.setProps({
      userList: userList,
    });
  }


  render() {
    return this.compile(template, this.props);
  }

}

export default connect(({ notValid, user, userList }) => ({ notValid, user, userList }))(ChatPage);
