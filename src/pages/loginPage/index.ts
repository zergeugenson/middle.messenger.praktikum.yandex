import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { SubmitButton } from '@/components/submitButton';
import { InputField } from '@/components/inputField';
import template from './loginPage.hbs?raw';

export class LoginPage extends Block {
  init() {
    this.props = {
      ...this.props,
      events: {
        submit: this.onSubmit.bind(this),
      },
    };

    this.children = {
      loginField: new InputField({
        id: 'log-login',
        name: 'login',
        type: 'text',
        disabled: false,
        placeholder: 'Введите логин',
        pattern: /^[a-zA-Z0-9_-]{3,20}$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: 'sergeykhromov',
      }),
      passwordField: new InputField({
        id: 'log-password',
        name: 'password',
        type: 'password',
        disabled: false,
        placeholder: 'Введите пароль',
        pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
        value: 'AAArrrr66hdm',
      }),
      SubmitButton: new SubmitButton({
        id: 'signin-button',
        text: 'Войти',
        type: 'submit',
        disabled: false,
      }),
      LinkBack: new Link({
        text: 'Регистрация',
        href: '/register'
      }),
    };

    super.init();

  }

  onSubmit(e: Event) {
    e.preventDefault();
    const isError = Object.values(this.children).filter(child=>(child instanceof InputField)).some(child=>child.isError);
    if (isError) return;
    const form:HTMLElement = document.getElementById('login-form')!;
    const formData = new FormData(form as HTMLFormElement);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log('Form Data:', data);
  }

  render(): string {
    return template;
  }
}
