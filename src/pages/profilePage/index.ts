import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { RoundButton } from '@/components/roundButton';
import { InputField } from '@/components/inputField';
import template from './profilePage.hbs?raw';
import { mockCredentials as credentials } from '@/mock/mockData.js';
import {SubmitButton} from "@/components/submitButton";

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
      }),
      avatarField: new InputField({
        id: 'profile-avatar-field',
        name: 'avatar',
        type: 'file',
        disabled: false,
        class: 'hidden',
      }),
      loginField: new InputField({
        id: 'profile-login',
        name: 'login',
        type: 'text',
        disabled: false,
        pattern: /^[a-zA-Z0-9_-]{3,20}$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: credentials.login,
      }),
      mailField: new InputField({
        id: 'profile-mail',
        name: 'mail',
        type: 'text',
        disabled: false,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: credentials.mail,
      }),
      firstNameField: new InputField({
        id: 'profile-first_name',
        name: 'first_name',
        type: 'text',
        disabled: false,
        pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё\-]*$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: credentials.first_name,
      }),
      secondNameField: new InputField({
        id: 'profile-second_name',
        name: 'second_name',
        type: 'text',
        disabled: false,
        pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё\-]*$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: credentials.second_name,
      }),
      displayNameField: new InputField({
        id: 'profile-display_name',
        value: credentials.display_name,
        name: 'display_name',
        type: 'text',
        disabled: false,
      }),
      phoneField: new InputField({
        id: 'profile-phone',
        name: 'phone',
        type: 'phone',
        disabled: false,
        pattern: /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: credentials.phone,
      }),
      changeDataLink: new SubmitButton({
        text: 'Изменить данные',
        type: 'submit',
        disabled: false,
        class: "profile-submit-button",
      }),
      changePasswordLink: new Link({
        href: '#',
        text: 'Изменить пароль',
        datapage: 'ProfilePage',
        disabled: true,
      }),
      logoutLink: new Link({
        href: '#',
        text: 'Выйти',
        datapage: 'ProfilePage',
        disabled: true,
      }),
      deleteProfileLink: new Link({
        href: '#',
        text: 'Удалить профиль',
        datapage: 'LoginPage',
        disabled: true,
      }),
      passwordField: new InputField({
        id: 'profile-password',
        name: 'password',
        type: 'password',
        disabled: false,
        placeholder: 'Введите пароль',
        class: 'hidden',
        pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
        value: 'AAArrrr66hdm',
      }),
      passwordRepeatField: new InputField({
        id: 'profile-password_repeat',
        name: 'password_repeat',
        type: 'password',
        disabled: false,
        placeholder: 'Повторите пароль',
        class: 'hidden',
        pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
        value: 'AAArrrr66hdm',
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
    const form:HTMLElement = document.getElementById('change-profile-form')!;
    const formData = new FormData(form as HTMLFormElement);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log('Form Data:', data);
  }
}
