import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { SubmitButton } from '@/components/submitButton';
import { InputField } from '@/components/inputField';
import template from './loginPage.hbs';
import { connect } from '@/framework/connect';
import { appRouter } from '@/main';
import { doLogin, getUser } from '@/controllers/AuthController';

class LoginPage extends Block {
  constructor(props: Record<string, any> = {}) {
    const loginField = new InputField({
      id: 'log-login',
      name: 'login',
      type: 'text',
      disabled: false,
      placeholder: 'Введите логин',
      pattern: /^[a-zA-Z0-9_-]{3,20}$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      // value: 'caesar',
      value: 'string',
    });

    const passwordField = new InputField({
      id: 'log-password',
      name: 'password',
      type: 'password',
      disabled: false,
      placeholder: 'Введите пароль',
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
      // value: 'Caesar100',
      value: 'string',
    });

    const submitButton = new SubmitButton({
      id: 'signin-button',
      text: 'Войти',
      type: 'submit',
      disabled: window.store.getState().notValid,
    });

    const linkBack = new Link({
      text: 'Регистрация',
      href: '#',
      events: {
        click: (e) => {
          e.preventDefault();
          e.stopPropagation();
          appRouter.go('/register');
        },
      },
    });


    const onSubmit = (e: Event) => {

      e.preventDefault();
      const isError = Object.values(this.children).filter(child=>(child instanceof InputField)).some(child=>child.isError);

      if (isError) {
        // return;
      }

      const form:HTMLElement = document.getElementById('login-form')!;
      const formData = new FormData(form as HTMLFormElement);
      const data: { [key: string]: FormDataEntryValue } = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      void doLogin(data).then( () => {
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
      this.setProps({ ...props });
    };



    super({
      ...props,
      loginField,
      passwordField,
      submitButton,
      linkBack,
    });
    init();
  }




  render() {
    return this.compile(template, this.props);
  }
}

export default connect(({ notValid, user }) => ({ notValid, user }))(LoginPage);
