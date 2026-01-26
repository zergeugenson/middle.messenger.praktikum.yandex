import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import type { BlockProps } from '@/types';
import page from './page404.hbs?raw';

export class Page404 extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      LinkBack: new Link({
        href: '#',
        datapage: 'LoginPage',
        text: 'Назад на главную',
        onClick: (event: Event) => {
          const el = event.target as HTMLElement;
          console.log('CLICK', el?.getAttribute('data-page'));
          event.preventDefault();
          event.stopPropagation();
          // eventBus.emit(Block.EVENTS.pageChange, el?.getAttribute('data-page'));
        },
      }),
    });
  }

  render(): string {
    return page;
  }
}
