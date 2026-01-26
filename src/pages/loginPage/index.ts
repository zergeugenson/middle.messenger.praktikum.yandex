import './style.scss';
import Block from "@/framework/Block";
import { Link } from "@/components/iLink";
import { submitButton } from "@/components/submitButton";
import page from './loginPage.hbs?raw';

export class loginPage extends Block {
    init() {
        this.props = {
            ...this.props,
            events: {
                click: this.onSubmit.bind(this),
            },
        };

        this.children = {
            submitButton: new submitButton({
                id: 'signup-button',
                text: 'Войти',
                datapage: 'loginPage',
                type: 'button',
                disabled: false,
                onClick: this.onSubmitClick.bind(this),
            }),
            LinkBack: new Link({
                datapage: 'loginPage',
                text: 'Назад на главную',
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
        const el = e.target as HTMLElement;
        console.log('onSubmitClick', el?.getAttribute('data-page'), this.children.submitButton);
        this.children.submitButton.setProps({text: 'jopa'});
        // event.preventDefault();
        // event.stopPropagation();
    }
    onSubmit(e: Event) {

        if (!(e.target instanceof HTMLFormElement)) {
            return;
        }
        e.preventDefault();

        const formData = new FormData(e.target);


        console.log("Кликнули САБМИТ", formData);
    }

    render(): string {
        return page;
    }
}
