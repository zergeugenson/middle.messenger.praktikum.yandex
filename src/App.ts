import Handlebars from 'handlebars';
import * as Pages from '@/pages';
import './helpers/handlebarsHelpers.js';
import Block from '@/framework/Block';
// 2DO убрать отладочные данные
import { mockCredentials } from './mock/mockData.js';
import { credentialsFieldLabels } from './lib/constants/creditionalsFieldLabels.js';

import { chatContact } from '@/pages/chatPage/templateParts/chatContact';
import { chatMessage } from '@/pages/chatPage/templateParts/chatMessage';

Handlebars.registerPartial('chatContact', chatContact);
Handlebars.registerPartial('chatMessage', chatMessage);

// import { Page404 } from '@/pages/page404';
// import { Page5xx } from '@/pages/page5xx';
import { LoginPage } from '@/pages/loginPage';
// import { RegisterPage } from '@/pages/registerPage';
// import { ProfilePage } from '@/pages/profilePage';
// import { ChatPage } from '@/pages/chatPage';



export default class App extends Block {
  public state: Record<string, any>;

  public appElement: HTMLElement | null;


  constructor() {
    super({});
    this.state = {
      currentPage: 'RegisterPage',
      credentials: mockCredentials,
      credentialsFieldLabels: credentialsFieldLabels,
      errorCode: 502,
    }
    ;
    this.appElement = document.getElementById('app');
  }

  renderPage() {
    // if (this.state.currentPage === 'RegisterPage') {
    const displayPage = new LoginPage(this.props);
    if (this.appElement) {
      this.appElement.appendChild(displayPage.getContent());
    }
    // }
    return '';
    if (!Pages || !Pages[this.state.currentPage]) return;
    const template = Handlebars.compile(Pages[this.state.currentPage]);
    this.appElement.innerHTML = template({
      credentials: this.state.credentials,
      credentialsFieldLabels: this.state.credentialsFieldLabels,
      errorCode: this.state.currentPage === 'Page5xx' ? this.state.errorCode : 0,
    });

    this.attachEventListeners();
  }

  attachEventListeners() {
    const Links = document.querySelectorAll('.i-link');
    Links.forEach(link => {
      link.addEventListener('click', (e:Event & {
        target: HTMLButtonElement
      }) => {
        if (!(e.target instanceof HTMLButtonElement)) {
          return;
        }
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    });
  }

  changePage(page: unknown) {
    this.state.currentPage = page;
    this.renderPage();
  }
}
