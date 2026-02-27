import './style.scss';
import template from './foundUsersList.hbs';
import Block from '@/framework/Block';
import { BlockProps } from '@/types';

export default class ListOfUsers extends Block {
  constructor(props:BlockProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}

