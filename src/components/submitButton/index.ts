import Block from '@/framework/Block';
import './style.scss';
import template from './submitButton.hbs?raw';
import type { BlockProps } from '@/types';

export class SubmitButton extends Block {
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
        class: [`submit-button ${props.class ? ' ' + props.class : ''}${props.disabled ? ' disabled' : ''}`],
      },
    });
  }
}
