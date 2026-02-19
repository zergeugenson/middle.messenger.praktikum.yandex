import './style.scss';
import sidebarTemplate from './sidebar.hbs';
import Block from '@/framework/Block';
import { InputField } from '@/components/inputField';
import Popup from '@/components/popUp';
import { appRouter } from '@/main';
import { SubmitButton } from '@/components/submitButton';
import { showPopup, getFormData, hidePopup } from '@/framework/utils';
import { addChat } from '@/controllers/ChatsController';

class Sidebar extends Block {
  constructor(props: Record<string, any> = {}) {

    const createChatButton = new SubmitButton({
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

    const searchField = new InputField({
      id: 'chat-search',
      name: 'search',
      type: 'text',
      disabled: false,
      placeholder: 'Поиск контактов',
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
            click: (e: Event) => this.doAddUser(e),
          },
        }),
      ],
    });

    super({
      ...props,
      addChatPopUp,
      createChatButton,
      viewProfile,
      searchField,
    });
  }

  doAddUser(e:Event) {
    e.preventDefault();
    const popup = this.children.addChatPopUp.element;
    const { title } = getFormData('add-chat-form-id');
    if (title) {
      void addChat({ title }).then( (result) => {
        console.log("AddChatResult", result)
        hidePopup(popup);
        const formElement = document.getElementById('add-chat-form-id') as HTMLFormElement;
        formElement.reset();
      });
    }
  }

  render() {
    return this.compile(sidebarTemplate, this.props);
  }
}

export default Sidebar;
