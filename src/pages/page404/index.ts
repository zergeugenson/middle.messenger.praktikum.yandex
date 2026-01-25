import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import page from './page404.hbs?raw';

export class page404 extends Block {
    constructor() {
        super({
            template: page,
            LinkBack: new Link({
                href: '#',
                datapage: 'loginPage',
                text: 'Назад на главную',
                onClick: (event: Event) => {
                    const el = event.target as HTMLElement;
                    console.log('CLICK', el?.getAttribute('data-page'));
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
        });
    }
}
