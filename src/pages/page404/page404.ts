import Block from '@/framework/Block';
import error404Template from './page404.hbs';
import { Link } from '@/components/iLink';
import { appRouter } from '@/main';

class Page404 extends Block {
  constructor(props: Record<string, any> = {}) {
    const errorTitle = '404';
    const errorText = 'Не туда попали';
    const backButton = new Link({
      text: 'Назад к чатам',
      events: {
        click: (e) => {
          e.preventDefault();
          e.stopPropagation();
          appRouter.go('/chat');
        },
      },
    });
    super('template', { ...props, errorTitle, errorText, backButton });
  }

  render() {
    return this.compile(error404Template, this.props);
  }
}

export default Page404;
