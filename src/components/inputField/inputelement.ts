import Block from '@/framework/Block';
import template from './inputelement.hbs';
import { BlockProps } from '@/types';

export default class Input extends Block {
  constructor(props: BlockProps) {
    super({ ...props });
  }

  protected componentDidUpdate(): boolean {
    // console.log("отдались в инпут", this.props)
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
