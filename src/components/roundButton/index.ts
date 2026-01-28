import Block from '@/framework/Block';
import './style.scss';
import template from './roundButton.hbs?raw';
import type { BlockProps } from '@/types';

export class RoundButton extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      template,
      events: {
        click: (e: Event) => {
          if (typeof props.onClick === 'function') {
            props.onClick(e);
          }
        },
      },
      attr: {
        class: [`round-button ${props.class ? ' ' + props.class : ''}`],
        'data-page': props.datapage,
        id: props.id,
        type: props.type || 'button',
      },
    });
  }
}
