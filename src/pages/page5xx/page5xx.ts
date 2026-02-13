import './style.scss';
import Block from '@/framework/Block';
import { Link } from '@/components/iLink';
import type { BlockProps } from '@/types';
import page from './page5xx.hbs?raw';
import { appRouter } from "@/main";
import {connect} from "@/framework/connect";

class Page5xx extends Block {
  constructor(props: BlockProps) {
    super({
      ...props,
      LinkBack: new Link({
        href: '/',
        text: 'Назад на главную',
        onClick: (event: Event) => {
          event.preventDefault();
          appRouter.go('/');
        },
      }),
    });
  }

  render(): string {
    return page;
  }
}

export default connect(({ notValid, user }) => ({ notValid, user }))(Page5xx)
