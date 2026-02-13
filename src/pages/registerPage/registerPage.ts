import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { SubmitButton } from '@/components/submitButton';
import { InputField } from '@/components/inputField';
import template from './registerPage.hbs?raw';
import { connect } from '@/framework/connect'
import { appRouter } from "@/main";

class RegisterPage extends Block {
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
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: 'sergeykhromov.com',
        isError: this.props.isError,
      }),
      loginField: new InputField({
        id: 'reg-login',
        name: 'login',
        type: 'text',
        disabled: false,
        placeholder: 'Желаемый логин',
        pattern: /^[a-zA-Z0-9_-]{3,20}$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: 'sergeykhromov',
      }),
      firstNameField: new InputField({
        id: 'reg-first_name',
        name: 'first_name',
        type: 'text',
        disabled: false,
        placeholder: 'Имя',
        pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё\-]*$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: 'Сергей',
      }),
      secondNameField: new InputField({
        id: 'reg-second_name',
        name: 'second_name',
        type: 'text',
        disabled: false,
        placeholder: 'Фамилия',
        pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё\-]*$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: 'Хромов',
      }),
      phoneField: new InputField({
        id: 'reg-phone',
        name: 'phone',
        type: 'phone',
        disabled: false,
        placeholder: 'Телефон',
        pattern: /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: '+7(916)121-11-22',
      }),
      passwordField: new InputField({
        id: 'reg-password',
        name: 'password',
        type: 'password',
        disabled: false,
        placeholder: 'Введите пароль',
        pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
        value: 'AAArrrr66hdm',
      }),
      passwordRepeatField: new InputField({
        id: 'reg-password_repeat',
        name: 'password_repeat',
        type: 'password',
        disabled: false,
        placeholder: 'Повторите пароль',
        pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
        value: 'AAArrrr66hdm',
      }),
      SubmitButton: new SubmitButton({
        id: 'signup-button',
        text: 'Зарегистрироваться',
        type: 'submit',
        disabled: false,
        onClick: ()=>{},
      }),
      LinkBack: new Link({
        href: '/',
        text: 'Войти',
        onClick: (event: Event) => {
          event.preventDefault();
          appRouter.go('/');
        },
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
    const form:HTMLElement = document.getElementById('register-form')!;
    const formData = new FormData(form as HTMLFormElement);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log('Form Data:', data);
  }

}

export default connect(({ notValid, user }) => ({ notValid, user }))(RegisterPage)
