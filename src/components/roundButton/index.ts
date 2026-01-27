import Block from '@/framework/Block';
import './style.scss';
import template from './roundButton.hbs?raw';

export class RoundButton extends Block {
    constructor(props: any) {
        super({
            ...props,
            template,
            events: {
                click: (e: Event) => {
                    props.onClick(e);
                },
            },
            attr: {
                class: [`round-button ${props.class ? ' ' + props.class : ''}`],
                'data-page': props.datapage,
                id: props.id,
            },
        });
    }
}
