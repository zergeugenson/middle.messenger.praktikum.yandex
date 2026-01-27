import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { SubmitButton } from '@/components/submitButton';
import { InputField } from '@/components/inputField';
import template from './registerPage.hbs?raw';

export class RegisterPage extends Block {
  init() {
    this.props = {
      ...this.props,
      events: {
        submit: this.onSubmit.bind(this),
      },
    };

    this.children = {
      emailField: new InputField({
        id: 'reg-email',
        name: 'email',
        type: 'text',
        disabled: false,
        placeholder: 'Электронная почта',
        title: '',
        onBlur: this.handler.bind(this),
        value: this.props.value,
      }),
      loginField: new InputField({
        id: 'reg-login',
        name: 'login',
        type: 'text',
        disabled: false,
        placeholder: 'Желаемый логин',
        title: '',
        onBlur: this.handler.bind(this),
        value: this.props.value,
      }),
      firstNameField: new InputField({
        id: 'reg-first_name',
        name: 'first_name',
        type: 'text',
        disabled: false,
        placeholder: 'Имя',
        title: '',
        onBlur: this.handler.bind(this),
        value: this.props.value,
      }),
      secondNameField: new InputField({
        id: 'reg-second_name',
        name: 'second_name',
        type: 'text',
        disabled: false,
        placeholder: 'Фамилия',
        title: '',
        onBlur: this.handler.bind(this),
        value: this.props.value,
      }),
      phoneField: new InputField({
        id: 'reg-phone',
        name: 'phone',
        type: 'phone',
        disabled: false,
        placeholder: 'Телефон',
        title: '',
        onBlur: this.handler.bind(this),
        value: this.props.value,
      }),
      passwordField: new InputField({
        id: 'reg-password',
        name: 'password',
        type: 'password',
        disabled: false,
        placeholder: 'Введите пароль',
        title: '',
        onBlur: this.handler.bind(this),
        value: this.props.value,
      }),
      passwordRepeatField: new InputField({
        id: 'reg-password_repeat',
        name: 'password_repeat',
        type: 'password',
        disabled: false,
        placeholder: 'Повторите пароль',
        title: '',
        onBlur: this.handler.bind(this),
        value: this.props.value,
      }),
      SubmitButton: new SubmitButton({
        id: 'signup-button',
        text: 'Зарегистрироваться',
        type: 'submit',
        disabled: false,
        onClick: ()=>{},
      }),
      LinkBack: new Link({
        datapage: 'LoginPage',
        text: 'Войти',
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

  render(): string {
    return template;
  }

  handler(e: Event): void {
    console.log(e);
  }

  onSubmit(e: Event) { console.log('кликнули кнопку сабмит', e);}

}

