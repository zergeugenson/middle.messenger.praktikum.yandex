import Block from '@/framework/Block';
import './style.scss';
import iLink from './iLink.hbs';

interface LinkProps {
  href?: string;
  class?: string;
  disabled?: boolean;
  events?: any;
  datapage?: string;
  text?: string;
  image?: string;
  alt?:string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
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
    });
  }

  render() {
    return this.compile(iLink, this.props);
  }

}
