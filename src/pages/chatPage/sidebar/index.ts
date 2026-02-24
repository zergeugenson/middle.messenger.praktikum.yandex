import './style.scss';
import sidebarTemplate from './sidebar.hbs';
import Block from '@/framework/Block';

export default class Sidebar extends Block {
  constructor(props: Record<string, any> = {}) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(sidebarTemplate, this.props);
  }
}

