import Block from '@/framework/Block';
import './style.scss';
import template from './submitButton.hbs?raw';

export class submitButton extends Block {
    constructor(props: any) {
        super({
            ...props,
            template,
            events: {
                click: (e: Event) => {
                    console.log('clc')
                    props.onClick(e);
                },
            },
            attr: {
                class: [`submit-button ${props.class?' '+props.class:''}`],
                'data-page': props.datapage,
                id: props.id,
                text: props.text,
            },
        });
    }
}
