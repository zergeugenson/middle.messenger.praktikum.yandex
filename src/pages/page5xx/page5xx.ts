import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import type { BlockProps } from '@/types';
import { appRouter } from '@/main';
import template from './page5xx.hbs';

export default class Page5xx extends Block {
  constructor(props: BlockProps) {
    const errorTitle = '5xx';
    const errorText = 'Ошибка сервера';
    const backButton = new Link({
      text: 'Назад к чатам',
      events: {
        click: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
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
