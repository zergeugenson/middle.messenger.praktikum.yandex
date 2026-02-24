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
      name: 'email',
      placeholder: 'Электронная почта',
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      value: '',
    });
    const loginField = new InputField({
      name: 'login',
      placeholder: 'Желаемый логин',
      pattern: /^[a-zA-Z0-9_-]{3,20}$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      value: '',
    });
    const firstNameField = new InputField({
      name: 'first_name',
      placeholder: 'Имя',
      value: '',
    });
    const secondNameField = new InputField({
      name: 'second_name',
      placeholder: 'Фамилия',
      value: '',
    });
    const phoneField = new InputField({
      name: 'phone',
      type: 'phone',
      placeholder: 'Телефон',
      pattern: /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/,
      errorMessage: 'Только цифры, числом не менее 11',
      value: '',
    });
    const passwordField = new InputField({
      name: 'password',
      type: 'password',
      placeholder: 'Введите пароль',
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: '8-40 символов, заглавная буква и цифра',
      value: '',
    });
    const passwordRepeatField = new InputField({
      name: 'password_repeat',
      type: 'password',
      placeholder: 'Повторите пароль',
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: '8-40 символов, заглавная буква и цифра',
      value: '',
    });
    const submitButton = new SubmitButton({
      id: 'signup-button',
      text: 'Зарегистрироваться',
      type: 'submit',
    });
    const linkBack = new Link({
      href: '#',
      text: 'Войти',
      events: {
        click: () => {
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

      window.store.set({ user: {} });
      void doRegister(data).then(()=>{
        void getUser().then( () => {
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
      this.setProps(props);
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

export default connect(({ user }) => ({ user }))(RegisterPage);
