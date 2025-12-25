import Handlebars from 'handlebars';
import * as Pages from './pages';

import { inputField }  from './components/inputField';
import { submitButton } from './components/submitButton';
import { iLink } from './components/iLink';

Handlebars.registerPartial('inputField', inputField );
Handlebars.registerPartial('submitButton', submitButton);
Handlebars.registerPartial('iLink', iLink);

export default class App {
	constructor() {
		this.state = {
			currentPage: 'chatPage',
			creditionals: {name: 'Zerg Eugenson'},
			errorCode: 502,
		}
		;
		this.appElement = document.getElementById('app');
	}

	render() {
		let template;
		if(!Pages || !Pages[this.state.currentPage]) return;
		template = Handlebars.compile(Pages[this.state.currentPage]);
		this.appElement.innerHTML = template({
			creditionals: this.state.creditionals,
			errorCode: this.state.currentPage==='page5xx' ? this.state.errorCode : 0,
		});
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
