import Handlebars from 'handlebars';
import * as Pages from './pages';

import { inputField }  from './components/inputField';
import { submitButton } from './components/submitButton';
import { iLink } from './components/iLink';
import { roundButton } from './components/roundButton';

Handlebars.registerPartial('inputField', inputField );
Handlebars.registerPartial('submitButton', submitButton);
Handlebars.registerPartial('iLink', iLink);
Handlebars.registerPartial('roundButton', roundButton);

// 2DO убрать во втором спринте
import { Menu } from './components/Menu';

export default class App {
	constructor() {
		this.state = {
			currentPage: 'profilePage',
			creditionals: {name: 'Zerg Eugenson'},
			errorCode: 502,
		}
		;
		this.appElement = document.getElementById('app');
		this.menuElement = document.getElementById('menu');
	}

	render() {
		let template;
		if(!Pages || !Pages[this.state.currentPage]) return;
		template = Handlebars.compile(Pages[this.state.currentPage]);
		this.appElement.innerHTML = template({
			creditionals: this.state.creditionals,
			errorCode: this.state.currentPage==='page5xx' ? this.state.errorCode : 0,
		});
// 2DO убрать во втором спринте
		const menuTemplate = Handlebars.compile(Menu);
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
