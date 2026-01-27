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
        title: '',
        onBlur: this.onLoginChange.bind(this),
      }),
      passwordField: new InputField({
        id: 'log-password',
        name: 'password',
        type: 'password',
        disabled: false,
        placeholder: 'Введите пароль',
        title: '',
        onBlur: this.onpasswordChange.bind(this),
        value: this.props.value,
      }),
      SubmitButton: new SubmitButton({
        id: 'signin-button',
        text: 'Войти',
        type: 'submit',
        disabled: false,
        onClick: this.onSubmitClick.bind(this),
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

  onSubmitClick(e: Event) {
    // const el = e.target as HTMLElement;
    // console.log('onSubmitClick', el?.getAttribute('data-page'), this.children.SubmitButton);
    // this.children.SubmitButton.setProps({ text: 'jopa' });
    e.preventDefault();
    e.stopPropagation();
    // const form:HTMLElement = document.getElementById('login-form')!;
    // const formData = new FormData(form as HTMLFormElement);
    // const Password = formData.get("password")?.toString() || '';

    // const err = this.validatePassword(Password);

    // if(err) {
    //   this.children.passwordField.setProps({
    //     error: true,
    //     errorText: err,
    //   });
    // }

    // console.log('Кликнули САБМИТ', formData, Password);
  }

  onLoginChange(e: Event) {
    console.log('onLoginChange', typeof e);
  }

  onpasswordChange(e: Event) {
    // const err = this.validatePassword('ef');
    // this.setError(this.children.passwordField, err)
    // console.log("PASS:", this.children.passwordField, e)
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const inputValue = e.target.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    let errorText = '';

    if (!passwordRegex.test(inputValue)) {
      if (inputValue.length < 8 || inputValue.length > 40) {
        errorText = 'Пароль должен быть от 8 до 40 символов.';
      } else if (!/[A-Z]/.test(inputValue)) {
        errorText = 'Пароль должен содержать хотя бы одну заглавную букву.';
      } else if (!/\d/.test(inputValue)) {
        errorText = 'Пароль должен содержать хотя бы одну цифру.';
      }
      this.children.passwordField.setProps({
        errorText: errorText,
      });
    } else {
      this.children.passwordField.setProps({
        errorText: '',
      });
    }
  }


  render(): string {
    return template;
  }

  onSubmit() { console.log('кликнули кнопку сабмит');}

}
