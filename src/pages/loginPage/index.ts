import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { SubmitButton } from '@/components/submitButton';
import { InputField } from '@/components/inputField';
import template from './loginPage.hbs?raw';
import { validateLogin, validatePassword } from '@/framework/Validations'

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
        onBlur: this.onLoginChange.bind(this),
      }),
      passwordField: new InputField({
        id: 'log-password',
        name: 'password',
        type: 'password',
        disabled: false,
        placeholder: 'Введите пароль',
        onBlur: this.onpasswordChange.bind(this),
        value: this.props.value,
      }),
      SubmitButton: new SubmitButton({
        id: 'signin-button',
        text: 'Войти',
        type: 'submit',
        disabled: false,
      }),
      LinkBack: new Link({
        datapage: 'RegisterPage',
        text: 'Регистрация',
        onClick: (event: Event) => {
          const el = event.target as HTMLElement;
          console.log('CLICK', el?.getAttribute('data-page'));
          event.preventDefault();
          event.stopPropagation();
          // eventBus.emit(Block.EVENTS.pageChange, el?.getAttribute('data-page'));
        },
      }),
    };

    super.init();

  }

  onLoginChange(e: Event) {
    const errorText = validateLogin(e)
    if(errorText) {
      this.children.loginField.setProps({
        errorText: errorText,
      });
    }
  }

  onpasswordChange(e: Event) {
    const errorText = validatePassword(e)
    if(errorText) {
      this.children.passwordField.setProps({
        errorText: errorText,
      });
    }
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const form:HTMLElement = document.getElementById('login-form')!;
    const formData = new FormData(form as HTMLFormElement);
    const data: {[key: string]: FormDataEntryValue} = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log("Form Data:", data);
  }

  render(): string {
    return template;
  }
}
