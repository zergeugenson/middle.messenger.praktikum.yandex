import './style.scss';
import template from './profileAvatar.hbs';
import Block from '@/framework/Block';
import { BlockProps } from '@/types';

export default class ProfileAvatar extends Block {
  constructor(props: BlockProps = {}) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
