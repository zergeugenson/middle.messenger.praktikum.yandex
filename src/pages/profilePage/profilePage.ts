import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { RoundButton } from '@/components/roundButton';
import { InputField } from '@/components/inputField';
import ProfileAvatar from './ProfileAvatar';
import template from './profilePage.hbs';
import { appRouter } from '@/main';
import { connect } from '@/framework/connect';
import { doLogout } from '@/controllers/AuthController';
import { getFormData } from '@/framework/utils';
import { changeUserProfile, changeUserAvatar, changeUserPassword } from '@/controllers/UserController';
import Input from '@/components/inputField/inputelement';
import { SubmitButton } from '@/components/submitButton';
import { RESOURSES } from '@/lib/constants';


class ProfilePage extends Block {
  constructor(props: Record<string, any> = {}) {
    const roundButton = new RoundButton({
      class: 'i-link rotate',
      events: {
        click: () => {
          appRouter.go('/chat');
        },
      },
    });

    const avatarField = new Input({
      id: 'profile-avatar-input',
      name: 'avatar',
      type: 'file',
      isdisabled: false,
      class: 'profile-avatar-input hidden',
    });
    const avatarUploadButton = new SubmitButton({
      id: 'profile-avatar-button',
      name: 'avatar',
      type: 'submit',
      isdisabled: false,
      class: 'profile-avatar-button hidden',
    });

    const profileAvatar = new ProfileAvatar({
      profileAvatarUrl: props.user.avatar ? `${RESOURSES}${props.user.avatar}` : '/images/default-avatar.png',
      events: {
        click: (e:Event) => {
          e.preventDefault();
          const avatarImage = document.getElementById('avatar-container') as HTMLImageElement;
          const fileInput = document.getElementsByClassName('profile-avatar-input')[0] as HTMLFormElement;
          const fileButton = document.getElementsByClassName('profile-avatar-button')[0];
          if (fileInput && fileButton) {
            fileInput.addEventListener('change', () => {
              if (fileInput.files.length > 0) {
                void changeUserAvatar(fileInput.files[0]).then((res:any) => {
                  if (res.avatar) {
                    avatarImage.src = URL.createObjectURL(fileInput.files[0]);
                    this.children.profileAvatar.setProps({ profileAvatarUrl: `${RESOURSES}${res.avatar}` });
                  } else {
                    console.error('Изображение не загрузилось');
                  }
                });
              }
            });
            fileInput.click();
          }
        },
      },
    });

    const userDataFields = [
      new InputField({
        label: 'Логин',
        id: 'profile-login',
        name: 'login',
        type: 'text',
        isdisabled: true,
        pattern: /^[a-zA-Z0-9_-]{3,20}$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: props.user.login,
      }),
      new InputField({
        label: 'E-mail',
        id: 'profile-mail',
        name: 'email',
        type: 'text',
        isdisabled: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: props.user.email,
      }),
      new InputField({
        label: 'Имя',
        id: 'profile-first_name',
        name: 'first_name',
        type: 'text',
        isdisabled: true,
        value: props.user.first_name,
      }),
      new InputField({
        label: 'Фамилия',
        id: 'profile-second_name',
        name: 'second_name',
        type: 'text',
        isdisabled: true,
        value: props.user.second_name,
      }),
      new InputField({
        label: 'Псевдоним',
        id: 'profile-display_name',
        value: props.user.display_name,
        name: 'display_name',
        type: 'text',
        isdisabled: true,
      }),
      new InputField({
        label: 'Телефон',
        id: 'profile-phone',
        name: 'phone',
        type: 'phone',
        isdisabled: true,
        pattern: /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/,
        errorMessage: 'от 3 до 20 символов, латиница, без пробелов',
        value: props.user.phone,
      }),

    ];

    const changeDataLink = new Link({
      class: '',
      href: '#',
      text: 'Изменить профиль',
      disabled: false,
      events: {
        click: () => {
          userDataFields.forEach((item)=>{
            item.setProps({ isdisabled: false });
          });
          this.children.changeDataLink.setProps({ class: 'hidden' });
          this.children.saveDataLink.setProps({ class: '' });
        },
      },
    });

    const saveDataLink = new Link({
      class: 'hidden',
      href: '#',
      text: 'Сохранить профиль',
      disabled: false,
      events: {
        click: async () => {
          const { display_name, email, first_name, login, phone, second_name } = getFormData("change-profile-form");
          await changeUserProfile({
            display_name,
            email,
            first_name,
            login,
            phone,
            second_name,
          }).then(() => this.saveData(userDataFields));
        },
      },
    });

    const passwordDataFields = [
      new InputField({
        label: 'Старый пароль',
        name: 'oldpassword',
        type: 'password',
        isdisabled: true,
        placeholder: 'Старый пароль',
        class: '',
        value: props.user.password, //'AAArrrr66hdm',
      }),
      new InputField({
        label: 'Новый пароль',
        name: 'newpassword',
        type: 'password',
        isdisabled: true,
        placeholder: 'Новый пароль',
        class: '',
        pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
        errorMessage: 'от 8 до 40 символов, + одна заглавная буква и цифра.',
        value: '',
      })
    ]

    const changePasswordLink = new Link({
      class: '',
      href: '#',
      text: 'Изменить пароль',
      disabled: false,
      events: {
        click: () => {
          passwordDataFields.forEach((item)=>{
            item.setProps({ isdisabled: false });
          });
          this.children.changePasswordLink.setProps({ class: 'hidden' });
          this.children.savePasswordLink.setProps({ class: '' });
        },
      },
    });

    const savePasswordLink = new Link({
      class: 'hidden',
      href: '#',
      text: 'Сохранить пароль',
      disabled: false,
      events: {
        click: async () => {
          const { oldpassword, newpassword } = getFormData("change-password-form");
          await changeUserPassword({
            oldPassword: oldpassword,
            newPassword: newpassword
          }).then((res: any) => {
            passwordDataFields.forEach((item)=>{
              item.setProps({ isdisabled: true });
            });
            this.children.changePasswordLink.setProps({ class: '' });
            this.children.savePasswordLink.setProps({ class: 'hidden' });
            if(res !== 'OK') console.error('Password not changed', res.reason)
          });
        },
      },
    });

    const logoutLink = new Link({
      href: '#',
      text: 'Выйти',
      events: {
        click: () => {
          void doLogout().then(()=>{
            appRouter.go('/');
          });
        },
      },
    });

    const init = () => {
      props = {
        ...props,
        user: window.store.getState().user,
      };
      this.setProps(props);
    };

    super({
      ...props,
      roundButton,
      userDataFields,
      changePasswordLink,
      savePasswordLink,
      logoutLink,
      changeDataLink,
      passwordDataFields,
      saveDataLink,
      profileAvatar,
      avatarField,
      avatarUploadButton,
    });
    init();
  }

  saveData(targetObj: any){
    const user = window.store.getState().user;
    this.setProps({ user: user });
    targetObj.forEach((item: any)=>{
      this.children.changeDataLink.setProps({ class: '' });
      this.children.saveDataLink.setProps({ class: 'hidden' });
      const el = item.element.children[0].querySelector('input');
      if (el) {
        el.disabled = true;
        el.classList.add('disabled');
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }

}

export default connect(({ notValid, user }) => ({ notValid, user }))(ProfilePage);
