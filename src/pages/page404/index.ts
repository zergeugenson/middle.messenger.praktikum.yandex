import Block from '@/framework/Block';
import { Link } from '@/components/iLink';

export class page404 extends Block {
    constructor() {
        super({
            LinkCreate: new Link({
                href: '#',
                datapage: 'createQuestionnaire',
                text: 'Create Questionnaire',
                onClick: (event: Event) => {
                    console.log('CLICK');
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
        });
    }

    override render(): string {
        return `<div class="page404">
404
{{{ LinkCreate }}}
    </div>`;
    }
}
