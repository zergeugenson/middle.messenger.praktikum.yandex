import Block from '@/framework/Block';

export default class ErrorLine extends Block {
  render(): string {
    return `
      <div class="input-field__error{{# if errorText }} error{{/ if }}">
          <div class="error-message">
              <div class="input__text-error">
                  {{# if errorText }}{{ errorText }}{{ else }}&nbsp;{{/ if }}
              </div>
          </div>
      </div>
`;
  }
}
