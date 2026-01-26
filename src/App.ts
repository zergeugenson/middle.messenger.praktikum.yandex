import Handlebars from 'handlebars';
import * as Pages from '@/pages';
import './helpers/handlebarsHelpers.js';

import { inputField }  from './components/inputField';
// import { submitButton } from '@/components/submitButton';
import { iLink } from '@/components/iLink/deleteme';
import { roundButton } from '@/components/roundButton';
import Block from '@/framework/Block';

Handlebars.registerPartial('inputField', inputField );
// Handlebars.registerPartial('submitButton', submitButton);
Handlebars.registerPartial('iLink', iLink);
Handlebars.registerPartial('roundButton', roundButton);

import { creditionalsFieldLabels } from './lib/constants/creditionalsFieldLabels.js';

// 2DO убрать отладочные данные
import { mockCreditionals } from './mock/mockData.js';

import { page404 } from '@/pages/page404';
import { loginPage } from '@/pages/loginPage';

export default class App extends Block {
  public state: Record<string, any>;
  public appElement: HTMLElement | null;


  constructor() {
    super({});
    this.state = {
      currentPage: 'loginPage',
      creditionals: mockCreditionals,
      creditionalsFieldLabels: creditionalsFieldLabels,
      errorCode: 502,
    }
    ;
    this.appElement = document.getElementById('app');
  }

  renderPage() {
    // if (this.state.currentPage === 'loginPage') {
      const displayPage = new loginPage(this.props);
      console.log(displayPage.getContent());
      if (this.appElement) {
        this.appElement.appendChild(displayPage.getContent());
      }
    // }
    return '';
    if (!Pages || !Pages[this.state.currentPage]) return;
    const template = Handlebars.compile(Pages[this.state.currentPage]);
    this.appElement.innerHTML = template({
      creditionals: this.state.creditionals,
      creditionalsFieldLabels: this.state.creditionalsFieldLabels,
      errorCode: this.state.currentPage === 'page5xx' ? this.state.errorCode : 0,
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
