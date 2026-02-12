import Block from '@/framework/Block';
import './style.scss';
import iLink from './iLink.hbs?raw';
import type { BlockProps } from '@/types';

export class Link extends Block {
  constructor(props: BlockProps) {
    super({
      template: iLink,
      ...props,
      events: {
        click: (e: Event) => {
          if (typeof props.onClick === 'function') {
            e.preventDefault();
            e.stopPropagation();
            props.onClick(e);
          }
        },
      },
    });
  }

}
