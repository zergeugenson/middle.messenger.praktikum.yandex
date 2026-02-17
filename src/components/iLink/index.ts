import Block from '@/framework/Block';
import './style.scss';
import iLink from './iLink.hbs';
import type { BlockProps } from '@/types';

export class Link extends Block {
  constructor(props: BlockProps) {
    super('template', {
      ...props,
      events: {
        click: (e: Event) => {
          if (typeof props?.events?.click === 'function') {
            e.preventDefault();
            e.stopPropagation();
            props.events.click(e);
          }
        },
      },
    });
  }

  render() {
    return this.compile(iLink, this.props);
  }

}
