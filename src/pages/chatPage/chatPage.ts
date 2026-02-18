import './style.scss';
import Block from '@/framework/Block';
import { InputField } from '@/components/inputField';
import template from './chatPage.hbs';
import { connect } from '@/framework/connect';
import { getChats } from '@/controllers/ChatsController';
import Sidebar from './sidebar';
import ActiveChatWindow from './activeChatWindow';
import ChatMessage from './chatMessage';
import { StoreEvents } from '@/Store';
import ChatListItem from './chatListItem';
import type { ChatListItemProps } from '@/types';
import defaulAvatar from "@/assets/images/defaultUserAvatar.svg";
import type { AppState } from '@/types';

class ChatPage extends Block {
  constructor(props: Record<string, any> = {}) {
    const sidebar = new Sidebar();
    const activeChatWindow = new ActiveChatWindow();
    const init = () => {
      props = {
        ...props,
        events: {
          submit: this.onSubmit.bind(this),
        },
      };
      getChats().then(()=> {this.setChatsList()});
    };
    super({ ...props, sidebar, activeChatWindow });
    window.store.on(StoreEvents.Updated, this.handleStoreUpdate.bind(this));
    init();
  }

  setChatsList(){
    const chatList: any[] = [];
    const { chats } = window.store.getState();
    const { sidebar } = this.children
    chats?.forEach(
        (item: ChatListItemProps) => {
          chatList.push(
              new ChatListItem({
                title: item.title,
                unread_count: item.unread_count,
                chatID: item.id,
                chatMessage: item.last_message?.content || '',
                time: item.last_message?.time || '',
                events: {
                  click: () => {
                    const { activeChatWindow } = this.children
                    activeChatWindow.setProps({
                      avatarImg: defaulAvatar,
                      chatName: item.title,
                      chatId: item.id,
                    });
                  },
                },
              })
          );
        });
    sidebar.setProps({
      chatList: chatList,
    });
  }

  handleStoreUpdate() {
    const state = window.store.getState();
    const messageList = this.getMessageListFromProps(state);
    this.setProps({
      ...this.props,
      messageList: messageList.length > 0 ? messageList : [],
    });
  }

  getMessageListFromProps(props: AppState) {
    return (
        props.messages?.map((messageItem: any) => ({
          message: new ChatMessage({ ...messageItem, user: props.user }),
        })) || []
    );
  }

  onSubmit(e: Event){
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

  render() {
    return this.compile(template, this.props);
  }

}

export default connect(({ notValid, user }) => ({ notValid, user }))(ChatPage);
