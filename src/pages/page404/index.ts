import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import page from './page404.hbs?raw';
import Handlebars from "handlebars";
import * as Pages from "@/pages";

export class page404 extends Block {
    constructor() {
        super({
            template: page,
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
}
