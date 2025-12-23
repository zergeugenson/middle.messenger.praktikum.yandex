import Handlebars from 'handlebars';
import * as Pages from './pages';

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
