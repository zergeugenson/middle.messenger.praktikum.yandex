import './style.scss';
import template from './popUp.hbs';
import Block from '@/framework/Block';

interface PopupProps {
  formId?: string;
  popupId: string;
  input?: Block;
  message?: string;
  buttons?: unknown[];
  inputs?: unknown[];
  skin?: string,
  title?: string;
}

interface Target {
  target: HTMLElement;
}

export default class Popup extends Block {
  constructor({
    formId,
    popupId,
    input,
    title,
    buttons,
    inputs,
    message,
    skin,
  }: PopupProps) {

    super({
      formId,
      popupId,
      input,
      title,
      buttons,
      inputs,
      message,
      skin,
      events: {
        click: ({ target }: Target): void => {
          const avatar = document.getElementById(popupId) as HTMLElement;
          if (formId) {
            const formElement = document.getElementById(formId) as HTMLFormElement;
            formElement.reset();
          }
          if (target.classList.contains('pop-up-window')) {
            avatar.classList.remove('popup_opened');
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

