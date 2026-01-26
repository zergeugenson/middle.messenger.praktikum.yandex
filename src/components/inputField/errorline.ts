import Block from '@/framework/Block';
import type { BlockProps } from '@/types';

export default class ErrorLine extends Block {
  constructor(props: BlockProps) {
    super(props);
  }

  render(): string {
    return '<div class="input__text-error">{{errorText}}</div>';
  }
}
