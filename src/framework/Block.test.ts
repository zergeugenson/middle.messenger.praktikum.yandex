import Block from "../framework/Block";
import { expect } from "chai";
import Handlebars from "handlebars";
import sinon from 'sinon';

const template = `<div id="app">{{{ text }}}</div>`;

interface testProps {
    text?: string;
    events?: {
        click: () => void;
    };
}

class TestComponent extends Block {
    constructor(props:testProps) {
        super({...props});
    }

    render() {
        const templateHandlebars = Handlebars.compile(template);
        return this.compile(templateHandlebars, this.props);
    }

}

describe("Тесты модуля Block", () => {

    it('Компоненту передаются пропсы и они рендерятся', () => {
        const text = 'Текст';
        const component = new TestComponent({ text });
        const res = (component.element as HTMLDivElement)?.innerHTML;
        expect(res).to.be.eq(text);
    });

    it('Тестируется реактивность', () => {
        let text = 'Текст';
        const component = new TestComponent({ text });
        let res = (component.element as HTMLDivElement)?.innerHTML;
        expect(res).to.be.eq(text);
        text = 'Новый текст';
        component.setProps({ text })
        res = (component.element as HTMLDivElement)?.innerHTML;
        expect(res).to.be.eq(text);
    });

    it('Компоненту передается обработчик и он вызывается', () => {
        const handler = sinon.stub();
        const component = new TestComponent({
            text: 'Текст',
            events: { click: handler },
        });
        component.element.click();
        expect(handler.calledOnce).to.be.true;
    });
});
