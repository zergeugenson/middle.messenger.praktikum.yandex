import './style.scss';
import Block from '@/framework/Block';
import { ChatWebSocket } from '@/framework/ChatWebSocket';
import template from './chatPage.hbs';
import { connect } from '@/framework/connect';
import {
  addChat,
  deleteChat,
  getChats,
  getChatUsers,
  getToken,
  addUserToChat,
  userSearch,
} from '@/controllers/ChatsController';
import Sidebar from './sidebar';
import ActiveChatWindow from './activeChatWindow';
import ChatMessage from './chatMessage';
import { StoreEvents } from '@/Store';
import ChatListItem from './chatListItem';
import UserListItem from './userListItem';
import type { ChatListItemProps } from '@/types';
import type { AppState } from '@/types';
import {humanReadableTime, showPopup, getFormData, hidePopup, ucFirst} from '@/framework/utils';
import { SubmitButton } from '@/components/submitButton';
import { Link } from '@/components/iLink';
import { appRouter } from '@/main';
import Popup from '@/components/popUp';
import { InputField } from '@/components/inputField';
import { RoundButton } from '@/components/roundButton';
import ListOfUsers from '@/pages/chatPage/listOfUsers';
import FoundUsersList from '@/pages/chatPage/foundUsersList';

class ChatPage extends Block {
  constructor(props: Record<string, any> = {}) {

    const socket = new ChatWebSocket();
    window.store.set({ socket: socket });

    const sidebar = new Sidebar();

    const userName = props.user.display_name;

    const searchField = new InputField({
        name: 'filter',
        type: 'text',
        placeholder: 'Поиск контактов',
        value: '',
        events: {
          input: () => {
            this.setChatsList();
          }
        }
      })

    const foundUsersList = new FoundUsersList({});

    const activeChatWindow = new ActiveChatWindow();

    const addChatButton =       new Link({
      class: 'create-chat',
      text: 'Создать чат',
      image: '/images/add_circle.png',
      alt: 'Добавить в чат',
      events: {
        click: () => {
          showPopup({ popupId: 'add-chat-popup-id' });
        },
      },
    });

    const viewProfile = new Link({
      image: '/images/account_circle.png',
      class: 'user-profile',
      alt: 'Удалить чат',
      events: {
        click: () => {
          appRouter.go('/profile');
        },
      },
    });

    const activeChatButtons = [
      new Link({
        image: '/images/add_circle.png',
        alt: 'Добавить в чат',
        events: {
          click: () => {
            const userFieldWindow = document.getElementById('user-field') as HTMLElement;
            userFieldWindow.style.display = userFieldWindow.style.display === 'none' ? 'block' : 'none';
          },
        },
      }),
      new Link({
        image: '/images/delete.png',
        alt: 'Удалить чат',
        events: {
          click: () => {
            if (!window.store.getState().selectedChat) return;
            showPopup({ popupId: 'delete-chat-popup-id' });
          },
        },
      }),
    ];

    const searchForUserField = new InputField({
      name: 'username',
      placeholder: 'Введите часть имени пользователя',
      value: 'string',
    });

    const searchForUserButton = new RoundButton({
      type: 'button',
      events: {
        click: (e: Event) => {
          e.preventDefault();
          void this.doAddUserToChat();
        },
      },
    });

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
      void getChats().then(()=> {
        this.setChatsList();
      });
      this.setProps({ ...props });
    };
    super({
      ...props,
      userName,
      addChatButton,
      viewProfile,
      addChatPopUp,
      sidebar,
      activeChatWindow,
      activeChatButtons,
      deleteChatPopUp,
      searchForUserButton,
      searchForUserField,
      foundUsersList,
      searchField,
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
    const { filter } = getFormData('sidebar-search-user')
    chats?.forEach(
      (item: ChatListItemProps) => {
        if(!item.title.includes(filter)) return
        const avatar = item.avatar
          ? `https://ya-praktikum.tech/api/v2/resources${item.avatar}`
          : '/defaultUserAvatar.svg';
        chatList.push(
          new ChatListItem({
            avatarUrl: avatar,
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
                  avatarLetter: ucFirst(item.title)[0],
                  chatName: item.title,
                  chatId: item.id,
                });
                this.getChatMessages(item.id);
                void this.doGetUserList(item.id);
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
    const res = await getChatUsers(id);
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
              const { selectedChat } = window.store.getState();
              void this.doGetUserList(selectedChat).then(()=>{
                this.setProps({ ...this.props });
                console.log('Выполняется в контексте: ', this);
              });
            },
          }),
        );
      });
    this.setProps({
      userList: userList,
    });
  }

  async doAddUserToChat() {
    const { username } = getFormData('users-search-form') || '';
    if (username === '') return [];
    await userSearch({ login: username }).then((res)=>{
      const listOfUsers: any = [];
      res?.forEach(
        (item: any) => {
          listOfUsers.push(
            new ListOfUsers({
              userID: item.id,
              userLogin: item.login,
              userName: item.first_name,
              callback: (): void => {
                const { selectedChat } = window.store.getState();
                void addUserToChat({
                  chatId: selectedChat,
                  userId: item.id,
                }).then(()=>{
                  void this.doGetUserList(selectedChat);
                });
              },
            }),
          );
        });
      this.children.foundUsersList.setProps({
        listOfUsers: listOfUsers,
      });
    });
  }


  render() {
    return this.compile(template, this.props);
  }

}

export default connect(({ user, userList }) => ({ user, userList }))(ChatPage);
