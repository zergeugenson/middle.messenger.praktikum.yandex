import './style.scss';
import Handlebars from 'handlebars';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { InputField } from '@/components/inputField';
import { RoundButton } from '@/components/roundButton';
import template from './chatPage.hbs?raw';
Handlebars.registerHelper('chatPageUserList', () => {
  return [
    {
      name: 'Андрей',
      message: 'Ваше слово, товарищ маузер.',
      unread: '2',
      time: '10:45',
    },
    {
      name: 'Максим',
      message: 'Левой!',
      unread: '10',
      time: '10:47',
    },
  ];
});

Handlebars.registerHelper('chatPageMessageList', () => {
  return [
    {
      message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
      time: '10:45',
    },
    {
      message: 'Повторяю!!! Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
      time: '10:47',
    },
  ];
});

export class ChatPage extends Block {
  init() {
    this.props = {
      ...this.props,
      events: {
        submit: this.onSubmit.bind(this),
      },
    };

    this.children = {
      profileLink: new Link({
        datapage: 'ProfilePage',
        text: 'Профиль >>',
        onClick: this.handler.bind(this),
      }),
      searchField: new InputField({
        id: 'chat-search',
        name: 'search',
        type: 'text',
        disabled: false,
        placeholder: 'Поиск контактов',
        onInput: this.handler.bind(this),
      }),
      messageField: new InputField({
        id: 'message-field',
        name: 'message',
        type: 'text',
        disabled: false,
        placeholder: 'Сообщение',
        pattern: /.+/,
        errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
        value: '',
      }),
      RoundButton: new RoundButton({
        id: 'message-send',
        type: 'submit',
        disabled: false,
      }),
    };

    super.init();

  }

  render(): string {
    return template;
  }

  onSubmit(e: Event) {
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
  }

  handler(e:Event) {
    console.log(e);
  }
}
