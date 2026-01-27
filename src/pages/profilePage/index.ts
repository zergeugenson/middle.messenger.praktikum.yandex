import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { RoundButton } from '@/components/roundButton';
import { InputField } from '@/components/inputField';
import template from './profilePage.hbs?raw';
import { mockCredentials as credentials } from '@/mock/mockData.js';

export class ProfilePage extends Block {
  init() {
    this.props = {
      ...this.props,
      credentials,
      events: {
        submit: this.onSubmit.bind(this),
      },
    };

    this.children = {
      RoundButton: new RoundButton({
        id: 'button-back-to-chat',
        disabled: false,
        class: 'i-link rotate',
        datapage: 'ChatPage',
        onClick: this.handler.bind(this),
      }),
      avatarField: new InputField({
        id: 'profile-avatar-field',
        name: 'avatar',
        type: 'file',
        disabled: false,
        onClick: this.handler.bind(this),
        class: 'hidden',
      }),
      loginField: new InputField({
        id: 'profile-login',
        value: credentials.login,
        name: 'login',
        type: 'text',
        disabled: false,
        skin: 'inline',
        onBlur: this.handler.bind(this),
      }),
      mailField: new InputField({
        id: 'profile-mail',
        value: credentials.mail,
        name: 'mail',
        type: 'text',
        disabled: false,
        skin: 'inline',
        onBlur: this.handler.bind(this),
      }),
      firstNameField: new InputField({
        id: 'profile-first_name',
        value: credentials.first_name,
        name: 'first_name',
        type: 'text',
        disabled: false,
        skin: 'inline',
        onBlur: this.handler.bind(this),
      }),
      secondNameField: new InputField({
        id: 'profile-second_name',
        value: credentials.second_name,
        name: 'second_name',
        type: 'text',
        disabled: false,
        skin: 'inline',
        onBlur: this.handler.bind(this),
      }),
      displayNameField: new InputField({
        id: 'profile-display_name',
        value: credentials.display_name,
        name: 'display_name',
        type: 'text',
        disabled: false,
        skin: 'inline',
        onBlur: this.handler.bind(this),
      }),
      phoneField: new InputField({
        id: 'profile-phone',
        value: credentials.phone,
        name: 'phone',
        type: 'phone',
        disabled: false,
        skin: 'inline',
        onBlur: this.handler.bind(this),
      }),
      changeDataLink: new Link({
        text: 'Изменить данные',
        onClick: this.handler.bind(this),
      }),
      changePasswordLink: new Link({
        text: 'Изменить пароль',
        onClick: this.handler.bind(this),
      }),
      logoutLink: new Link({
        text: 'Выйти',
        onClick: this.handler.bind(this),
      }),
      deleteProfileLink: new Link({
        text: 'Удалить профиль',
        onClick: this.handler.bind(this),
      }),
      passwordField: new InputField({
        id: 'profile-password',
        name: 'password',
        type: 'password',
        disabled: false,
        placeholder: 'Введите пароль',
        class: 'hidden',
        onBlur: this.onpasswordChange.bind(this),
        value: this.props.value,
      }),
      passwordRepeatField: new InputField({
        id: 'profile-password_repeat',
        name: 'password_repeat',
        type: 'password',
        disabled: false,
        placeholder: 'Повторите пароль',
        class: 'hidden',
        onBlur: this.onpasswordChange.bind(this),
        value: this.props.value,
      }),
    };

    super.init();

  }

  render(): string {
    return template;
  }

  onSubmitClick(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }

  onLoginChange(e: Event): void {
    console.log('onLoginChange', typeof e);
  }

  onpasswordChange(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }

  onSubmit() { console.log('кликнули кнопку сабмит');}

  handler(e:Event): void {
    console.log(e);
  }

  test(e:any = 'jopa'): void {
    console.log('TEST', e);
  }

}
