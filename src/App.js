import Handlebars from 'handlebars';
import * as Pages from './pages';

import { inputField }  from './components/inputField';
import { submitButton } from './components/submitButton';

Handlebars.registerPartial('inputField', inputField );
Handlebars.registerPartial('submitButton', submitButton);

export default class App {
	constructor() {
		this.state = {
			currentPage: 'loginPage',
		};
		this.appElement = document.getElementById('app');
	}

	render() {
		let template;
		template = Handlebars.compile(Pages.loginPage);
		this.appElement.innerHTML = template({
//			questions: this.state.questions,
//			createButtonEnabled: this.state.questions.length == 0
		});
		// this.attachEventListeners();
	}

	changePage(page) {
		this.state.currentPage = page;
		this.render();
	}

}
