import './style.scss';
import Block from '@/framework/Block';
import { ChatWebSocket } from '@/framework/ChatWebSocket';
import template from './chatPage.hbs';
import { connect } from '@/framework/connect';
import {
  createChat,
  deleteChat,
  getChats,
  getChatUsers,
  getToken,
  addUserToChat,
  userSearch,
} from '@/controllers/chatsController';
import Sidebar from './sidebar';
import ActiveChatWindow from './activeChatWindow';
import ChatMessage from './chatMessage';
import { StoreEvents } from '@/store';
import ChatListItem from './chatListItem';
import UserListItem from './userListItem';
import type { ChatListItemProps } from '@/types';
import type { AppState } from '@/types';
import { humanReadableTime, showPopup, getFormData, hidePopup, ucFirst } from '@/framework/utils';
import { SubmitButton } from '@/components/submitButton';
import { Link } from '@/components/iLink';
import { appRouter, appRoutes } from '@/main';
import Popup from '@/components/popUp';
import { InputField } from '@/components/inputField';
import { RoundButton } from '@/components/roundButton';
import ListOfUsers from '@/pages/chatPage/listOfUsers';
import FoundUsersList from '@/pages/chatPage/foundUsersList';
import { BlockProps, User } from '@/types';

interface ChatPageProps extends BlockProps {
  user?: User;
}

class ChatPage extends Block {
  constructor(props: ChatPageProps = {}) {

    const socket = new ChatWebSocket();
    window.store.set({ socket: socket });

    const sidebar = new Sidebar();

    const userName = (props.user as User).firstName;

    const searchField = new InputField({
      name: 'filter',
      type: 'text',
      placeholder: 'Поиск контактов',
      value: '',
      events: {
        input: () => {
          this.setChatsList();
        },
      },
    });

    const foundUsersList = new FoundUsersList({});

    const activeChatWindow = new ActiveChatWindow();

    const createChatButton = new Link({
      class: 'create-chat',
      text: 'Создать чат',
      image: '/images/add_circle.png',
      alt: 'Создать чат',
      events: {
        click: () => {
          showPopup({ popupId: 'create-chat-popup-id' });
        },
      },
    });

    const viewProfile = new Link({
      image: '/images/account_circle.png',
      class: 'user-profile',
      alt: 'Перейти в профиль',
      events: {
        click: () => {
          appRouter.go(appRoutes.Settings);
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
      value: '',
    });

    const searchForUserButton = new RoundButton({
      type: 'submit',
      events: {
        click: (e: Event) => {
          e.preventDefault();
          void this.doAddUserToChat();
        },
      },
    });

    const createChatPopUp = new Popup({
      formId: 'add-chat-form-id',
      popupId: 'create-chat-popup-id',
      title: 'Создать новый чат',
      inputs: [
        new InputField({
          name: 'title',
          placeholder: 'Название нового чата',
        }),
      ],
      buttons: [
        new SubmitButton({
          class: 'submit-button',
          text: 'Закрыть',
          events: {
            click: () => hidePopup(this.children.createChatPopUp.element),
          },
        }),
        new SubmitButton({
          class: 'submit-button',
          text: 'Создать',
          events: {
            click: () => this.doCreateChat(),
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
          class: 'submit-button',
          text: 'Закрыть',
          events: {
            click: () => hidePopup(this.children.deleteChatPopUp.element),
          },
        }),
        new SubmitButton({
          class: 'submit-button',
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
      createChatButton,
      viewProfile,
      createChatPopUp,
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
    const chatsList: any[] = [];
    const { chats, selectedChat } = window.store.getState();
    const { sidebar } = this.children;
    const { filter } = getFormData('sidebar-search-user');
    chats?.forEach(
      (item: ChatListItemProps) => {
        if (filter?.length && item.title && !item.title.includes(filter)) return false;
        chatsList.push(
          new ChatListItem({
            title: item.title,
            unread_count: item.unread_count,
            chatID: item.id,
            chatMessage: item.last_message?.content || '',
            time: item.last_message?.time || '',
            isSelectedChat: selectedChat ? item.id === selectedChat : false,
            events: {
              click: () => {
                window.store.set({ messages:[], chatToken: null, selectedChat: 0 });
                chatsList.forEach(contact => {
                  contact.setProps({ isSelectedChat: false });
                });
                this.setProps({
                  avatarLetter: item.title ? ucFirst(item.title)[0] : '',
                  chatName: item.title,
                  chatId: item.id,
                });
                if (item.id) {
                  this.getChatMessages(item.id);
                  void this.doGetUserList(item.id);
                }
              },
            },
          }),
        );
      });
    if (!chatsList.length) {
      chatsList.push(new ChatListItem({}));
    }
    sidebar.setProps({ chatList: chatsList });
  }

  doCreateChat() {
    const popup = this.children.createChatPopUp.element;
    const { title } = getFormData('add-chat-form-id');
    if (title) {
      void createChat({ title }).then( () => {
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
      window.store.set({ messages:[], chatToken: null, selectedChat: 0 });
      this.setProps({
        selectedChat: 0,
        avatarLetter: '',
        chatName: '',
      });
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
            socket.openConnect( userId, chatID, chatToken as string );
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
    const users: { id: number, name: string }[] = [];
    const res = await getChatUsers(id) as ChatListItemProps[];
    window.store.set({ usersInChat: [] });
    res?.forEach(
      (item: any) => {
        users.push({ id: item.id, name: item.first_name });
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
              });
            },
          }),
        );
      });
    window.store.set({ usersInChat: users });
    this.setProps({
      userList: userList,
    });
  }

  async doAddUserToChat() {
    const { username } = getFormData('users-search-form') || '';
    if (username === '') return [];
    await userSearch({ login: username }).then((res:ChatListItemProps[])=>{
      const listOfUsers: any = [];
      res?.forEach(
        (item: any) => {
          listOfUsers.push(
            new ListOfUsers({
              userID: item.id,
              userLogin: item.login,
              userName: item.firstName,
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
