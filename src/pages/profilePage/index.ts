import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { RoundButton } from '@/components/roundButton';
import { inputField } from '@/components/inputField';
import template from './profilePage.hbs?raw';
import {mockCredentials as credentials} from '@/mock/mockData.js';

export class ProfilePage extends Block {
    init() {
        this.props = {
            ...this.props,
            credentials,
            events: {
                submit: this.onSubmit.bind(this),
            },
        };

        this.children = {
            RoundButton: new RoundButton({
                id: 'button-back-to-chat',
                disabled: false,
                class: "i-link rotate",
                datapage: 'chatPage',
                onClick: this.handler,
            }),
            avatarField: new inputField({
                id: 'profile-avatar-field',
                name: 'avatar',
                type: 'file',
                disabled: false,
                onClick: this.handler,
                class: 'hidden',
            }),
            loginField: new inputField({
                id: 'profile-login',
                value: credentials.login,
                name: 'login',
                type: 'text',
                disabled: false,
                skin: "inline",
                onBlur: this.handler,
            }),
            mailField: new inputField({
                id: 'profile-mail',
                value: credentials.mail,
                name: 'mail',
                type: 'text',
                disabled: false,
                skin: "inline",
                onBlur: this.handler,
            }),
            firstNameField: new inputField({
                id: 'profile-first_name',
                value: credentials.first_name,
                name: 'first_name',
                type: 'text',
                disabled: false,
                skin: "inline",
                onBlur: this.handler,
            }),
            secondNameField: new inputField({
                id: 'profile-second_name',
                value: credentials.second_name,
                name: 'second_name',
                type: 'text',
                disabled: false,
                skin: "inline",
                onBlur: this.handler,
            }),
            displayNameField: new inputField({
                id: 'profile-display_name',
                value: credentials.display_name,
                name: 'display_name',
                type: 'text',
                disabled: false,
                skin: "inline",
                onBlur: this.handler,
            }),
            phoneField: new inputField({
                id: 'profile-phone',
                value: credentials.phone,
                name: 'phone',
                type: 'phone',
                disabled: false,
                skin: "inline",
                onBlur: this.handler,
            }),
            changeDataLink: new Link({
                text: 'Изменить данные',
                onClick: this.handler,
            }),
            changePasswordLink: new Link({
                text: 'Изменить пароль',
                onClick: this.handler,
            }),
            logoutLink: new Link({
                text: 'Выйти',
                onClick: this.handler,
            }),
            deleteProfileLink: new Link({
                text: 'Удалить профиль',
                onClick: this.handler,
            }),
            passwordField: new inputField({
                id: 'profile-password',
                name: 'password',
                type: 'password',
                disabled: false,
                placeholder: 'Введите пароль',
                class: 'hidden',
                onBlur: this.onpasswordChange.bind(this),
                value: this.props.value,
            }),
            passwordRepeatField: new inputField({
                id: 'profile-password_repeat',
                name: 'password_repeat',
                type: 'password',
                disabled: false,
                placeholder: 'Повторите пароль',
                class: 'hidden',
                onBlur: this.onpasswordChange.bind(this),
                value: this.props.value,
            }),
        };

        super.init();

    }

    render(): string {
        return template;
    }

    onSubmitClick(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    onLoginChange(e: Event) {
        console.log('onLoginChange', typeof e);
    }

    onpasswordChange(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    onSubmit(){ console.log("кликнули кнопку сабмит")}
    handler(e:Event) {
        console.log(e);
    }
    test(e:any = 'jopa') {
        console.log('TEST', e);
    }

}
