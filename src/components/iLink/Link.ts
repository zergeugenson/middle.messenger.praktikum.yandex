import Block from '../../framework/Block';

export class Link extends Block {
  constructor(props: any) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          this.changeStyles();
          props.onClick(e);
        },
      },
      attr: {
        class: 'footer-link',
      },
    });
  }

  changeStyles() {
    this.setProps({ attr: {
      class: '',
    } });
  }

  override render() {
    return '<a href="{{href}}" class="{{class}}" data-page="{{datapage}}">{{text}}</a>';
  }
}
