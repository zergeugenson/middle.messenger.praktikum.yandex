import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { SubmitButton } from '@/components/submitButton';
import { InputField } from '@/components/inputField';
import template from './registerPage.hbs';
import { connect } from '@/framework/connect';
import { appRouter } from '@/main';
import { doRegister, getUser } from '@/controllers/AuthController';

class RegisterPage extends Block {
  constructor(props: Record<string, any> = {}) {
    const emailField = new InputField({
      id: 'reg-email',
      name: 'email',
      type: 'text',
      disabled: false,
      placeholder: 'Электронная почта',
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      value: 'caesar@spqr.rom',
      // isError: this.props.isError,
    });
    const loginField = new InputField({
      id: 'reg-login',
      name: 'login',
      type: 'text',
      disabled: false,
      placeholder: 'Желаемый логин',
      pattern: /^[a-zA-Z0-9_-]{3,20}$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      value: 'caesar',
    });
    const firstNameField = new InputField({
      name: 'first_name',
      type: 'text',
      isdisabled: false,
      placeholder: 'Имя',
      pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё\-]*$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      value: 'Gaius',
    });
    const secondNameField = new InputField({
      id: 'reg-second_name',
      name: 'second_name',
      type: 'text',
      disabled: false,
      placeholder: 'Фамилия',
      pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё\-]*$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      value: 'Iulius',
    });
    const phoneField = new InputField({
      id: 'reg-phone',
      name: 'phone',
      type: 'phone',
      disabled: false,
      placeholder: 'Телефон',
      pattern: /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      value: '+7(916)121-11-22',
    });
    const passwordField = new InputField({
      id: 'reg-password',
      name: 'password',
      type: 'password',
      disabled: false,
      placeholder: 'Введите пароль',
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
      value: 'Caesar100',
    });
    const passwordRepeatField = new InputField({
      id: 'reg-password_repeat',
      name: 'password_repeat',
      type: 'password',
      disabled: false,
      placeholder: 'Повторите пароль',
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
      value: 'Caesar100',
    });
    const submitButton = new SubmitButton({
      id: 'signup-button',
      text: 'Зарегистрироваться',
      type: 'submit',
      disabled: false,
      onClick: ()=>{},
    });
    const linkBack = new Link({
      href: '#',
      text: 'Войти',
      events: {
        click: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          appRouter.go('/');
        },
      },
    });

    const onSubmit = (e: Event) => {
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

      window.store.set({ user: {} });
      void doRegister(data).then((res)=>{
        console.log('register response', res); // {"id":5603}
        void getUser().then( (resp) => {
          console.log('register getuser', resp);
          if (window.store.getState().user?.id) {
            window.store.set({ isAuthorized: true });
            appRouter.go('/chat');
          }
        });
      });
    };

    const init = () => {
      props = {
        ...props,
        events: {
          submit: onSubmit.bind(this),
        },
      };
      this.setProps({ ...props });
    };

    super({
      ...props,
      emailField,
      loginField,
      firstNameField,
      secondNameField,
      phoneField,
      passwordField,
      passwordRepeatField,
      submitButton,
      linkBack,
    });
    init();
  }

  render() {
    return this.compile(template, this.props);
  }

}

export default connect(({ notValid, user }) => ({ notValid, user }))(RegisterPage);
