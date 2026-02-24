import Block from '@/framework/Block';
import template from './page404.hbs';
import { Link } from '@/components/iLink';
import { appRouter } from '@/main';

class Page404 extends Block {
  constructor(props: Record<string, any> = {}) {
    const errorTitle = '404';
    const errorText = 'Не туда попали';
    const backButton = new Link({
      text: 'Назад к чатам',
      events: {
        click: () => {
          appRouter.go('/chat');
        },
      },
    });
    super({ ...props, errorTitle, errorText, backButton });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Page404;
