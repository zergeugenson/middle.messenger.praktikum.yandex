import Block from '@/framework/Block';
import template from './inputelement.hbs';

export default class Input extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
