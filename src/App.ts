import Handlebars from 'handlebars';
import * as Pages from '@/pages';
import './helpers/handlebarsHelpers.js';
import Block from '@/framework/Block';
// 2DO убрать отладочные данные
import { mockCredentials } from './mock/mockData.js';
import { credentialsFieldLabels } from './lib/constants/creditionalsFieldLabels.js';
import { iLink } from './components/iLink/deleteme';

import { chatContact } from '@/pages/chatPage/templateParts/chatContact';
import { chatMessage } from '@/pages/chatPage/templateParts/chatMessage';
import { revieverMenu } from '@/components/revieverMenu';

Handlebars.registerPartial('chatContact', chatContact);
Handlebars.registerPartial('chatMessage', chatMessage);
Handlebars.registerPartial('iLink', iLink);

export default class App extends Block {
  public state: Record<string, any>;

  public appElement: HTMLElement | null;
  public menuElement: any;

  constructor() {
    super({});
    this.state = {
      currentPage: 'LoginPage',
      credentials: mockCredentials,
      credentialsFieldLabels: credentialsFieldLabels,
      errorCode: 502,
    }
    ;
    this.appElement = document.getElementById('app');
    this.menuElement = document.getElementById('revieverMenu');
  }

  renderPage() {
    const menuTemplate = Handlebars.compile(revieverMenu);
    this.menuElement.innerHTML = menuTemplate({});

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
    console.log(Links)
    Links.forEach(link => {
      link.addEventListener('click', (e:Event & {
        target: HTMLButtonElement
      }) => {
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
