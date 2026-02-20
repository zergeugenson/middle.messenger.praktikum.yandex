import './popup.scss';
import template from './popUp.hbs';
import Block from '@/framework/Block';

interface PopupProps {
  formId: string;
  popupId: string;
  input?: Block;
  popupFormButtonAdd?: Block;
  popupFormButtonSearch?: Block;
  popupFormButtonSave?: Block;
  setFoundUsers?: boolean;
  foundUsers?: Block;
  title?: string;
  buttons?: unknown[];
  inputs?: unknown[];
}

interface Target {
  target: HTMLElement;
}

export default class Popup extends Block {
  constructor({
    formId,
    popupId,
    input,
    setFoundUsers,
    foundUsers,
    title,
    buttons,
    inputs,
  }: PopupProps) {

    super({
      formId,
      popupId,
      input,
      setFoundUsers,
      foundUsers,
      title,
      buttons,
      inputs,
      events: {
        click: ({ target }: Target): void => {
          const avatar = document.getElementById(popupId) as HTMLElement;
          const formElement = document.getElementById(
            formId,
          ) as HTMLFormElement;
          if (target.classList.contains('pop-up-window')) {
            avatar.classList.remove('popup_opened');
          }
          formElement.reset();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

