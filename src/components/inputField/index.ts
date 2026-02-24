import './style.scss';
import template from './inputField.hbs';
import Block from '@/framework/Block';
import ErrorLine from './errorline';
import Input from './inputelement';

interface InputFieldProps {
  events?: {
    click?: () => void;
    input?: () => void;
    ficus?: () => void;
    blur?: () => void;
  };
  type?: string,
  label?: string,
  name?: string,
  value?: string | number | null | undefined,
  class?: string,
  id?: string | number,
  placeholder?: string,
  skin?: string,
  isdisabled?: boolean,
  errorText?: string
  pattern?: unknown;
  errorMessage?: string;
}


export class InputField extends Block {

  public isError: boolean;

  constructor(props: InputFieldProps) {
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
      }),
      ErrorLine: new ErrorLine({
        errorText: props.errorText || '',
      }),
      isError: props.errorText,
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
  }

  protected componentDidUpdate(): boolean {
    this.children.Input.setProps(this.props);
    return true;
  }

  render() {

    return this.compile(template, this.props);
  }
}
