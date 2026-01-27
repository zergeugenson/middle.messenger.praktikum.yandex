import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import type { BlockProps } from '@/types';
import page from './page5xx.hbs?raw';

export class Page5xx extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,
            LinkBack: new Link({
                href: '#',
                datapage: 'LoginPage',
                text: 'Назад на главную',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    // const el = event.target as HTMLElement;
                    // eventBus.emit(Block.EVENTS.pageChange, el?.getAttribute('data-page'));
                },
            }),
        });
    }
    render(): string {
        return page;
    }
}
