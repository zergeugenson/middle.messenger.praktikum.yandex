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
			currentPage: 'loginPage',
		};
		this.appElement = document.getElementById('app');
	}

	render() {
		let template;
		if(!Pages || !Pages[this.state.currentPage]) return;
		template = Handlebars.compile(Pages[this.state.currentPage]);
		this.appElement.innerHTML = template({
//			questions: this.state.questions,
//			createButtonEnabled: this.state.questions.length == 0
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
