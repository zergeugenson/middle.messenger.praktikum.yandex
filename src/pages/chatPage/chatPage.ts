import './style.scss';
import Block from '@/framework/Block';
import { ChatWebSocket } from '@/framework/ChatWebSocket';
import template from './chatPage.hbs';
import { connect } from '@/framework/connect';
import { getChats, getToken } from '@/controllers/ChatsController';
import Sidebar from './sidebar';
import ActiveChatWindow from './activeChatWindow';
import ChatMessage from './chatMessage';
import { StoreEvents } from '@/Store';
import ChatListItem from './chatListItem';
import type { ChatListItemProps } from '@/types';
import defaulAvatar from '@/assets/images/defaultUserAvatar.svg';
import type { AppState } from '@/types';
import { humanReadableTime } from '@/framework/utils';


class ChatPage extends Block {
  constructor(props: Record<string, any> = {}) {
    const sidebar = new Sidebar();
    const activeChatWindow = new ActiveChatWindow();
    const init = () => {
      props = {
        ...props,
      };
      void getChats().then(()=> {
        this.setChatsList();
      });
    };
    super({ ...props, sidebar, activeChatWindow });
    window.store.on(StoreEvents.Updated, this.onStoreUpdate.bind(this));
    init();
  }

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
                const { activeChatWindow } = this.children;
                activeChatWindow.setProps({
                  avatarImg: defaulAvatar,
                  chatName: item.title,
                  chatId: item.id,
                });
                this.getChatMessages(item.id);
              },
            },
          }),
        );
      });
    sidebar.setProps({
      chatList: chatList,
    });
  }

  getChatMessages(chatID: number) {
    if (chatID) {
      void getToken(chatID)
        .then((chatToken) => {
          const { user } = window.store.getState();
          const userId = user.id;
          if (chatID && chatToken && userId) {
            const socket = new ChatWebSocket();
          window.store.set({ socket: socket })
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
    });
    document.getElementById('messages-field')?.scrollTo({ top: 10000 });
  }

  getMessageListFromProps(props: AppState) {
    return (
      props.messages?.map((messageItem: any) => (
        new ChatMessage({
          ...messageItem,
          user: props.user,
          time: humanReadableTime(messageItem.time),
        })
      )) || []
    );
  }

  render() {
    return this.compile(template, this.props);
  }

}

export default connect(({ notValid, user }) => ({ notValid, user }))(ChatPage);
