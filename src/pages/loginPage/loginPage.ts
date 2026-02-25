import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { SubmitButton } from '@/components/submitButton';
import { InputField } from '@/components/inputField';
import template from './loginPage.hbs';
import { connect } from '@/framework/connect';
import { appRouter, appRoutes } from '@/main';
import { doLogin, getUser } from '@/controllers/authController';

class LoginPage extends Block {
  constructor(props: Record<string, any> = {}) {
    const loginField = new InputField({
      name: 'login',
      type: 'text',
      placeholder: 'Введите логин',
      pattern: /^[a-zA-Z0-9_-]{3,20}$/,
      errorMessage: '3-20 символов латиницей, без пробелов',
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

    const submitButton = new SubmitButton({
      id: 'signin-button',
      text: 'Войти',
      type: 'submit',
    });

    const linkBack = new Link({
      text: 'Регистрация',
      href: '#',
      events: {
        click: () => {
          appRouter.go(appRoutes.Settings);
        },
      },
    });


    const onSubmit = (e: Event) => {

      e.preventDefault();
      const isError = Object.values(this.children).filter(child=>(child instanceof InputField)).some(child=>child.isError);

      if (isError) {
        return;
      }

      const form:HTMLElement = document.getElementById('login-form')!;
      const formData = new FormData(form as HTMLFormElement);
      const data: { [key: string]: FormDataEntryValue } = {};
      formData.forEach((value, key) => {
        data[key] = value as string;
      });
      void doLogin(data).then( () => {
        void getUser().then( () => {
          if (window.store.getState().user?.id) {
            window.store.set({ isAuthorized: true });
            appRouter.go(appRoutes.Messenger);
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

export default connect(({ user }) => ({ user }))(LoginPage);
