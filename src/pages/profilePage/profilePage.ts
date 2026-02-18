import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { RoundButton } from '@/components/roundButton';
import { InputField } from '@/components/inputField';
import template from './profilePage.hbs';
import { SubmitButton } from '@/components/submitButton';
import { appRouter } from '@/main';
import { connect } from '@/framework/connect';
import { doLogout } from '@/controllers/AuthController';

class ProfilePage extends Block {
  constructor(props: Record<string, any> = {}) {
    const credentials = window.store.getState().user;
    const roundButton = new RoundButton({
      class: 'i-link rotate',
      events: {
        click: () => {
          appRouter.go('/chat');
        },
      },
    });
    const avatarField = new InputField({
      id: 'profile-avatar-field',
      name: 'avatar',
      type: 'file',
      disabled: false,
      class: 'hidden',
    });
    const loginField = new InputField({
      id: 'profile-login',
      name: 'login',
      type: 'text',
      disabled: false,
      pattern: /^[a-zA-Z0-9_-]{3,20}$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      value: credentials.login,
    });
    const mailField = new InputField({
      id: 'profile-mail',
      name: 'email',
      type: 'text',
      disabled: false,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      value: credentials.email,
    })
    const firstNameField = new InputField({
      id: 'profile-first_name',
      name: 'first_name',
      type: 'text',
      disabled: false,
      pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё\-]*$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      value: credentials.first_name,
    });
    const secondNameField = new InputField({
      id: 'profile-second_name',
      name: 'second_name',
      type: 'text',
      disabled: false,
      pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё\-]*$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      value: credentials.second_name,
    })
    const displayNameField = new InputField({
      id: 'profile-display_name',
      value: credentials.display_name,
      name: 'display_name',
      type: 'text',
      disabled: false,
    });
    const phoneField = new InputField({
      id: 'profile-phone',
      name: 'phone',
      type: 'phone',
      disabled: false,
      pattern: /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/,
      errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
      value: credentials.phone,
    })
    const changeDataLink = new SubmitButton({
      text: 'Изменить данные',
      type: 'submit',
      disabled: false,
      class: 'profile-submit-button',
    });
    const changePasswordLink = new Link({
      href: '/profile',
      text: 'Изменить пароль',
      disabled: true,
    });
    const logoutLink = new Link({
      href: '#',
      text: 'Выйти',
      events: {
        click: () => {
          void doLogout();
          appRouter.go('/');
        },
      },
    });
    const deleteProfileLink = new Link({
      href: '#',
      text: 'Удалить профиль',
      datapage: 'LoginPage',
      disabled: true,
    });
    const passwordField = new InputField({
      id: 'profile-password',
      name: 'password',
      type: 'password',
      disabled: false,
      placeholder: 'Введите пароль',
      class: 'hidden',
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
      value: 'AAArrrr66hdm',
    });
    const passwordRepeatField = new InputField({
      id: 'profile-password_repeat',
      name: 'password_repeat',
      type: 'password',
      disabled: false,
      placeholder: 'Повторите пароль',
      class: 'hidden',
      pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
      errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
      value: 'AAArrrr66hdm',
    })

    const onSubmit = (e: Event) => {
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
      roundButton,
      avatarField,
      loginField,
      mailField,
      firstNameField,
      secondNameField,
      displayNameField,
      phoneField,
      changeDataLink,
      changePasswordLink,
      logoutLink,
      deleteProfileLink,
      passwordField,
      passwordRepeatField
    })
    init();
  };

  render() {
    return this.compile(template, this.props);
  }

}

export default connect(({ notValid, user }) => ({ notValid, user }))(ProfilePage);
