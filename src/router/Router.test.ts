/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Router from './Router'
import Block from '../framework/Block'
import * as Handlebars from "handlebars";

describe('HTTPTransport', () => {
    const router = new Router('#app')
    class Page extends Block {
        render() {
            const templateHandlebars = Handlebars.compile('<div id="page">Page</div>');
            return this.compile(templateHandlebars, this.props);
        }
    }

    it('Метод USE', () => {
        const routerUseSpy = sinon.spy(router, 'use')
        router.use('path', Page as any)
        expect(routerUseSpy.calledOnce).to.be.eq(true)
    })

})
