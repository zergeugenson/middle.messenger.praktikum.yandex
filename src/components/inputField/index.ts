import './style.scss';
import template from './inputField.hbs?raw';
import Block from '@/framework/Block';
import ErrorLine from './errorline';
import Input from './inputelement';
import type { BlockProps } from '@/types';

export class InputField extends Block {

  public isError: boolean;

  constructor(props: BlockProps) {
    super({
      ...props,
      Input: new Input({
        events: {
          blur: () => this.doValidateAndCallback(),
          input: () => this.doValidateAndCallback(),
        },
        type: props?.type || 'text',
        name: props.name,
        value: props?.value || '',
        class: props.class || '',
        id: props.id,
        placeholder: props.placeholder,
        skin: props.skin,
        isdisabled: props.isdisabled || false,
        isError: props.isError || false,
      }),
      ErrorLine: new ErrorLine({
        errorText: props.errorText || '',
      }),
    });
    this._init();
  }

  public doValidateAndCallback(init = false): boolean {
    if (!this.props.pattern || !this.props.errorMessage) return false;
    const regExp = new RegExp(this.props.pattern);
    const res = regExp.test((this.children.Input.element as HTMLInputElement).value);
    this.children.ErrorLine.setProps({
      errorText: res ? '' : this.props.errorMessage,
    });
    this.isError = !res;
    if (!init && typeof this.props.onInput === 'function') this.props.onInput();
    if (!init && typeof this.props.onBlur === 'function') this.props.onBlur();
    return true;
  }

  protected _init(): void {
    this.doValidateAndCallback(true);
    // this.validate = this.validate.bind(this);
  }

  render(): string {
    return template;
  }
}
