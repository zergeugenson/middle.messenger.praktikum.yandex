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
        onBlur: this.onpasswordChange.bind(this),
        value: this.props.value,
      }),
      loginField: new InputField({
        id: 'reg-login',
        name: 'login',
        type: 'text',
        disabled: false,
        placeholder: 'Желаемый логин',
        title: '',
        onBlur: this.onpasswordChange.bind(this),
        value: this.props.value,
      }),
      firstNameField: new InputField({
        id: 'reg-first_name',
        name: 'first_name',
        type: 'text',
        disabled: false,
        placeholder: 'Имя',
        title: '',
        onBlur: this.onpasswordChange.bind(this),
        value: this.props.value,
      }),
      secondNameField: new InputField({
        id: 'reg-second_name',
        name: 'second_name',
        type: 'text',
        disabled: false,
        placeholder: 'Фамилия',
        title: '',
        onBlur: this.onpasswordChange.bind(this),
        value: this.props.value,
      }),
      phoneField: new InputField({
        id: 'reg-phone',
        name: 'phone',
        type: 'phone',
        disabled: false,
        placeholder: 'Телефон',
        title: '',
        onBlur: this.onpasswordChange.bind(this),
        value: this.props.value,
      }),
      passwordField: new InputField({
        id: 'reg-password',
        name: 'password',
        type: 'password',
        disabled: false,
        placeholder: 'Введите пароль',
        title: '',
        onBlur: this.onpasswordChange.bind(this),
        value: this.props.value,
      }),
      passwordRepeatField: new InputField({
        id: 'reg-password_repeat',
        name: 'password_repeat',
        type: 'password',
        disabled: false,
        placeholder: 'Повторите пароль',
        title: '',
        onBlur: this.onpasswordChange.bind(this),
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

  onSubmit(e: Event) { console.log('кликнули кнопку сабмит', e);}

}

