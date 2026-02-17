import EventBus, { EventCallback } from './EventBus';
import { nanoid } from 'nanoid';
import type { BlockProps } from '@/types';

export default class Block {
  static EVENTS = {
    ONINIT: 'init',
    ONMOUNT: 'flow:component-did-mount',
    ONUPDATE: 'flow:component-did-update',
    ONUNMOUNT: 'flow:component-will-unmount',
    ONRENDER: 'flow:render',
  };

  public isError: boolean = false;

  protected id: string;

  protected _element: HTMLElement | null = null;

  protected props: BlockProps;

  protected children: Record<string, Block>;

  protected template: string | undefined;

  protected eventBus: () => EventBus;

  protected tagName: string;

  constructor(tagName: string,  { ...propsWithChildren }) {
    this.id = nanoid();
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props, id: this.id });
    this.children = children;
    this.template = this.props.template;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.ONINIT);
    this.tagName = tagName ? tagName : 'div';
  }

  private _getChildrenAndProps(propsWithChildren: any) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        if (Array.isArray(value) && value[0] instanceof Block) {
          value.forEach((item, index) => {
            if (!children[key]) {
              children[key] = [];
            }
            children[key][index] = item;
          });
        } else {
          props[key] = value;
        }
      }
    });

    return { children, props };
  }

  private _makePropsProxy(props: BlockProps): BlockProps {
    const self = this as Block;

    return new Proxy(props, {
      get(target: { [key: string]: object }, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: { [key: string]: object }, prop: string, value: object) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.ONUPDATE, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  private _addEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.ONINIT, this.init.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.ONMOUNT, this._componentDidMount.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.ONUPDATE, this._componentDidUpdate.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.ONUNMOUNT, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.ONRENDER, this._render.bind(this) as EventCallback);
    // eventBus.on(Block.EVENTS.pageChange, this.pageChange.bind(this) as EventCallback);
  }

  protected init(): void {
    this._element = this._createDocumentElement(this.tagName);
    this.eventBus().emit(Block.EVENTS.ONRENDER);
  }

  private _componentDidMount(oldProps: BlockProps): void {
    this.componentDidMount(oldProps);
    //Теперь, когда для родительского компонента будет вызван componentDidMount, он последовательно будет вызван для всех потомков вниз по дереву компонентов.
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => {
          item.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  componentDidMount(oldProps: BlockProps) {
    return oldProps;
  }

  private _componentWillUnmount() {
    // console.log('ONUNMOUNT:', this.props);
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidUnMount();
    });
    this._removeEvents();
    this._element?.remove();
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.ONMOUNT);
  }

  public dispatchComponentDidUnMount(): void {
    this.eventBus().emit(Block.EVENTS.ONUNMOUNT);
  }

  private _componentDidUpdate(): void {
    this.componentDidUpdate();
    this.eventBus().emit(Block.EVENTS.ONRENDER);
  }

  protected componentDidUpdate(): boolean {
    return true;
  }

  get element(): HTMLElement {
    return this._element!;
  }

  private _render() {
    const fragment = this.render();
    const element = fragment.firstElementChild as HTMLElement;
    this._removeEvents();
    if (this._element) {
      this._element.innerHTML = '';
      this._element.replaceWith(element);
    }
    this._element = element;
    this._addEvents();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return;
    }
    const { children } = this._getChildrenAndProps(nextProps as BlockProps);
    Object.assign(this.children, children);
    Object.assign(this.props, nextProps);
  };

  compile(template: any, props: any) {
    const propsAndStubs = { ...props };
    Object.entries(this.children).forEach(([key, child]) => {
      //добавляем заглушки в объект с пропсами
      if (Array.isArray(child)) {
        propsAndStubs[key] = [];
        child.forEach((item) => {
          propsAndStubs[key].push({
            [key]: `<div data-id="${item.id}"></div>`,
          });
        });
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    //Чтобы не рендерить заглушки на страницу, создадим временный контейнер.
    const fragment = this._createDocumentElement(
      'template',
    );
    //Теперь нужно заменить заглушки на компоненты.
    fragment.innerHTML = template(propsAndStubs);
    //Рендерим наш шаблон в созданный элемент, а затем заменяем в нём заглушки на компоненты.
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => {
          const stub = fragment.content.querySelector(`[data-id="${item.id}"]`);

          if (stub) stub.replaceWith(item.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
        if (stub) stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  hide(): void {
    const content = this.getContent();
    if (content && Boolean(false)) content.style.display = 'none';
  }

}
