import Block from '@/framework/Block';
import './style.scss';
import template from './submitButton.hbs';
import type { BlockProps } from '@/types';

export class SubmitButton extends Block {
  constructor(props: BlockProps) {
    super({
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
      attr: {
        class: [`submit-button ${props.class ? ' ' + props.class : ''}`],
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
