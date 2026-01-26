import Block from "@/framework/Block";
import type {BlockProps} from '@/types';

export default class Input extends Block {
  constructor(props: BlockProps) {
    super(props);
  }

  render(): string {
    return `
      <input
        id="{{id}}"
        placeholder="{{placeholder}}"
        type="{{ type }}"
        title="{{ title }}"
        name="{{ name }}"
        value="{{value}}"
        autocomplete="off"
        class="input-element"
      />
    `;
  }
}
