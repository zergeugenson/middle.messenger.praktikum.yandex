import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import page from './page404.hbs?raw';
import Handlebars from "handlebars";
import * as Pages from "@/pages";

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

        // console.log("THIS", this.children.LinkCreate)
        //
        // const source = page;
        // const t = Handlebars.compile(source);
        // const context = {
        //     LinkCreate:this.children.LinkCreate
        // }
        //
        // const html = t(context);
        // console.log("html:", html);
        // return html;
        const template = Handlebars.compile(page);

        const q = template({
            LinkCreate: this.children.LinkCreate,
        });
        // console.log("temp:", template, "q:", q);
        return this.compile(q)
    }
}
