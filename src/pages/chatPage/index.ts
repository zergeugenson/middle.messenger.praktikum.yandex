import './style.scss';
import Handlebars from 'handlebars';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import { inputField } from '@/components/inputField';
import { RoundButton } from '@/components/roundButton';
import template from './chatPage.hbs?raw';
Handlebars.registerHelper("chatPageUserList", () => {
    return [
        {
            name: "Андрей",
            message: "Ваше слово, товарищ маузер.",
            unread: "2",
            time: "10:45"
        },
        {
            name: "Максим",
            message: "Левой!",
            unread: "10",
            time: "10:47"
        },
    ];
});

Handlebars.registerHelper("chatPageMessageList", () => {
    return [
        {
            message: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
            time: "10:45",
        },
        {
            message: "Повторяю!!! Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
            time: "10:47",
        },
    ];
});

export class ChatPage extends Block {
    init() {
        this.props = {
            ...this.props,
            events: {
                submit: this.onSubmit.bind(this),
            },
        };

        this.children = {
            profileLink: new Link({
                datapage: 'ProfilePage',
                text: 'Профиль >>',
                onClick: this.handler,
            }),
            searchField: new inputField({
                id: 'chat-search',
                name: 'search',
                type: 'text',
                disabled: false,
                placeholder: 'Поиск контактов',
                onInput: this.handler,
            }),
            messageField: new inputField({
                id: 'message-field',
                name: 'message',
                type: 'text',
                disabled: false,
                placeholder: 'Сообщение',
                onInput: this.handler,
            }),
            RoundButton: new RoundButton({
                id: 'message-send',
                disabled: true,
                class: "i-link",
                onClick: this.handler,
            }),
        };

        super.init();


    }

    onSubmitClick(e: Event) {

        e.preventDefault();
        e.stopPropagation();

    }

    onLoginChange(e: Event) {
        console.log('onLoginChange', typeof e);
    }

    onpasswordChange(e: Event) {

        if (!(e.target instanceof HTMLInputElement)) {
            return;
        }

    }


    render(): string {
        return template;
    }

    onSubmit(){ console.log("кликнули кнопку сабмит")}
    handler(e:Event) {
        console.log(e);
    }
}
