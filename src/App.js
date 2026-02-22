
/**
 * ЭТОТ ФАЙЛ БУДЕТ ПОЛНОСТЬЮ УБРАН В СЛЕДУЮЩЕМ СПРИНТЕ, КАК ТОЛЬКО ПОДНИМЕТСЯ РУТЕР
 * Никакого другого смысла, кроме переключения страниц, у него нет, поэтому он остался JS, а не TS
 */

import Handlebars from 'handlebars';
import * as Pages from '@/pages';
import Block from '@/framework/Block';

// 2DO удалить deleteme.ts
// import { iLink } from './components/iLink/deleteme';
// import { ChatContact } from '@/pages/chatPage/templateParts/chatContact';
// import { chatMessage } from '@/pages/chatPage/templateParts/chatMessage';
// Handlebars.registerPartial('ChatContact', ChatContact);
// Handlebars.registerPartial('chatMessage', chatMessage);
// Handlebars.registerPartial('iLink', iLink);

export default class App extends Block {

  constructor() {
    super({});
    this.state = {
      currentPage: 'LoginPage',
    }
    ;
    this.appElement = document.getElementById('app');
  }

  renderPage() {

    this.appElement.remove();
    const newApp = document.createElement('div');
    newApp.id = 'app';
    document.body.append(newApp);

    this.appElement = document.getElementById('app');
    const displayPage = new Pages[this.state.currentPage](this.props);

    if (this.appElement) {
      this.appElement.appendChild(displayPage.getContent());
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    const Links = document.querySelectorAll('.i-link');
    Links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (!e.target.dataset.disabled) {
          this.changePage(e.target.dataset.page);
        }
      });
    });
  }

  changePage(page) {
    this.state.currentPage = page;
    this.renderPage();
  }
}
