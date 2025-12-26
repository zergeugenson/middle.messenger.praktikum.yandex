import Handlebars from 'handlebars';
import * as Pages from './pages';
import './helpers/handlebarsHelpers.js';

import { inputField }  from './components/inputField';
import { submitButton } from './components/submitButton';
import { iLink } from './components/iLink';
import { roundButton } from './components/roundButton';

Handlebars.registerPartial('inputField', inputField );
Handlebars.registerPartial('submitButton', submitButton);
Handlebars.registerPartial('iLink', iLink);
Handlebars.registerPartial('roundButton', roundButton);

import { creditionalsFieldLabels } from './lib/constants/creditionalsFieldLabels.js';
// 2DO убрать во втором спринте
import { revieverMenu } from './components/revieverMenu';

// 2DO убрать отладочные данные
import { mockCreditionals } from './mock/mockData.js';

export default class App {
	constructor() {
		this.state = {
			currentPage: 'profilePage',
			creditionals: mockCreditionals,
			creditionalsFieldLabels: creditionalsFieldLabels,
			errorCode: 502,
		}
		;
		this.appElement = document.getElementById('app');
		this.menuElement = document.getElementById('revieverMenu');
	}

	render() {
		let template;
		if(!Pages || !Pages[this.state.currentPage]) return;
		template = Handlebars.compile(Pages[this.state.currentPage]);
		this.appElement.innerHTML = template({
			creditionals: this.state.creditionals,
			creditionalsFieldLabels: this.state.creditionalsFieldLabels,
			errorCode: this.state.currentPage==='page5xx' ? this.state.errorCode : 0,
		});
// 2DO убрать во втором спринте
		const menuTemplate = Handlebars.compile(revieverMenu);
		this.menuElement.innerHTML = menuTemplate({});

		this.attachEventListeners();
	}

	attachEventListeners() {
		const Links = document.querySelectorAll('.i-link');
		Links.forEach(link => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				this.changePage(e.target.dataset.page);
			});
		});
	}

	changePage(page) {
		this.state.currentPage = page;
		this.render();
	}
}
