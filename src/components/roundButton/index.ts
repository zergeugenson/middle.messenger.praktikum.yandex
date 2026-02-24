import Block from '@/framework/Block';
import './style.scss';
import template from './roundButton.hbs';
import type { BlockProps } from '@/types';

export class RoundButton extends Block {
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
        class: [`round-button ${props.class ? ' ' + props.class : ''}`],
        'data-page': props.datapage,
        id: props.id,
        type: props.type || 'button',
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
