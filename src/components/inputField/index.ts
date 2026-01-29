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
          blur: (e:Event) => this.doValidateAndCallback(e),
          input: (e:Event) => this.doValidateAndCallback(e),
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

  public doValidateAndCallback(e: Event | undefined, init = false): boolean {
    if (!this.props.pattern || !this.props.errorMessage) return false;
    const regExp = new RegExp(this?.props?.pattern as string || '');
    const res = regExp.test((this.children.Input.element as HTMLInputElement).value);
    this.children.ErrorLine.setProps({
      errorText: res ? '' : this.props.errorMessage,
    });
    this.isError = !res;
    if (!init && e && typeof this.props.onInput === 'function') this.props.onInput(e);
    if (!init && e && typeof this.props.onBlur === 'function') this.props.onBlur(e);
    return true;
  }

  protected _init(): void {
    this.doValidateAndCallback(undefined, true);
    // this.validate = this.validate.bind(this);
  }

  render(): string {
    return template;
  }
}
