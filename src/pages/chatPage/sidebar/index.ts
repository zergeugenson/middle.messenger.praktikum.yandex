import './style.scss';
import sidebarTemplate from './sidebar.hbs';
import Block from '@/framework/Block';
import { BlockProps } from '@/types';

export default class Sidebar extends Block {
  constructor(props: BlockProps = {}) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(sidebarTemplate, this.props);
  }
}

