import Block from '../../framework/Block';
import './style.scss';
import iLink from './iLink.hbs?raw';

export class Link extends Block {
    constructor(props: any) {
        super({
            ...props,
            events: {
                click: (e: Event) => {
                    this.changeStyles();
                    props.onClick(e);
                },
            },
            attr: {
                class: [`i-link ${props.class?' '+props.class:''}`],
            },
        });
    }
    override render() {
        return this.compile(iLink);
    }

    changeStyles() {
        this.setProps({ attr: {
                class: '',
            } });
    }
}
