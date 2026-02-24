import './style.scss';
import template from './profileAvatar.hbs';
import Block from '@/framework/Block';

export default class ProfileAvatar extends Block {
  constructor(props: Record<string, any> = {}) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
