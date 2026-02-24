import Block from '@/framework/Block';
import template from './errorline.hbs';

export default class ErrorLine extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
