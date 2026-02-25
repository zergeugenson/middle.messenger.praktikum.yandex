import template from './changePassword.hbs';
import Block from '@/framework/Block';
import { InputField } from '@/components/inputField';
import { getFormData, hidePopup, showPopup } from '@/framework/utils';
import { changeUserPassword } from '@/controllers/userController';
import Popup from '@/components/popUp';
import { SubmitButton } from '@/components/submitButton';

export default class ChangePassword extends Block {
  constructor(props: Record<string, any> = {}) {

    const passwordDataFields = [
      new InputField({
        label: 'Старый пароль',
        name: 'oldpassword',
        type: 'password',
        placeholder: 'Старый пароль',
        class: '',
        value: '', //'AAArrrr66hdm',
      }),

      new InputField({
        label: 'Новый пароль',
        name: 'newpassword',
        type: 'password',
        placeholder: 'Новый пароль',
        class: '',
        pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
        value: '',
      }),
    ];

    const savePasswordLink = new SubmitButton({
      class: 'submit-button',
      href: '#',
      text: 'Изменить пароль',
      disabled: false,
      events: {
        click:  () => {
          const { oldpassword, newpassword } = getFormData('change-password-form');
          void changeUserPassword({
            oldPassword: oldpassword,
            newPassword: newpassword,
          }).then((res: any) => {
            passwordDataFields.forEach((item)=>{
              item.setProps({ isdisabled: true });
            });
            this.children.changePasswordLink.setProps({ class: '' });
            this.children.savePasswordLink.setProps({ class: 'hidden' });
            if (res !== 'OK') {
              this.children.passwordErrorPopUp.setProps({ message: res.reason as string });
              showPopup({ popupId: 'password-error-popup-id' });
              console.error('Password not changed', res.reason);
            }
          });
        },
      },
    });

    const passwordErrorPopUp = new Popup({
      popupId: 'password-error-popup-id',
      skin: 'error',
      title: 'Ошибка!',
      message:'',
      buttons: [
        new SubmitButton({
          class: 'submit-button',
          text: 'Закрыть',
          events: {
            click: () => hidePopup(this.children.passwordErrorPopUp.element),
          },
        }),
      ],
    });

    super({
      ...props,
      passwordDataFields,
      savePasswordLink,
      passwordErrorPopUp,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
