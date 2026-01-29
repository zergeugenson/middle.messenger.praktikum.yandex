import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import type { BlockProps } from '@/types';
import page from './page5xx.hbs?raw';

export class Page5xx extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      LinkBack: new Link({
        href: '#',
        datapage: 'LoginPage',
        text: 'Назад на главную',
      }),
    });
  }

  render(): string {
    return page;
  }
}
