import { expect } from 'chai'
import sinon from 'sinon'
import Router from '@/router/Router'
import Block from '@/framework/Block'

describe('Тесты модуля Роутер, проверка методов', () => {
    const router = new Router('#app')
    class Page extends Block {}

    it('USE: маршруты сохраняются', () => {
        const router = new Router("#root");
        router.use("path1", Page);
        router.use("path2", Page);
        expect(router.routes.length).eq(2);
    })

    it('START: запускается, и только один раз', () => {
        const setStub = sinon.stub()
        router._onRoute = setStub
        router.start()
        expect(setStub.calledOnce).to.be.eq(true)
    })

    it('GO: переход на страницу', () => {
        router.go('/path1')
        expect(window.location.href).to.eq('http://jsdom/path1')
    })

    it('BACK: вызывается и только один раз', () => {
        const setSpy = sinon.spy(window.history, 'back')
        router.back()
        expect(setSpy.calledOnce).to.be.eq(true)
    })

    it('FORWARD: вызывается и только один раз', () => {
        const setSpy = sinon.spy(window.history, 'forward')
        router.forward()
        expect(setSpy.calledOnce).to.be.eq(true)
    })
})
