import EventBus, { EventCallback } from './EventBus';
import Handlebars from 'handlebars';
import { v4 as newUuid } from "uuid";

import * as Pages from '@/pages';
import { page404 } from '@/pages';

interface EventMap {
  [key: string]: EventListener | EventListenerObject;
}

interface Attributes {
  [key: string]: string;
}

interface BlockProps {
  events?: EventMap;
  attr?: Attributes | false;
  template?: string;
}

export interface Children {
  [key: string]: Block;
}

export default class Block{

  [key: string]: unknown;

  static EVENTS = {
    ONINIT: 'init',
    ONMOUNT: 'flow:component-did-mount',
    ONUPDATE: 'flow:component-did-update',
    ONUNMOUNT: 'flow:component-will-unmount',
    ONRENDER: 'flow:render',
    pageChange:'pageChange',
  };

  private _isMounted: boolean = false;
  protected _element: HTMLElement | null = null;
  protected props: BlockProps;
  protected children: Record<string, Block>;
  protected lists: Record<string, any[]>;
  protected template: string | undefined;
  protected eventBus: () => EventBus;
  public al: HTMLElement | null;

  constructor({ ...propsWithChildren }) {
    const eventBus = new EventBus();
    const { props, children, lists } = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy(props);
    this.children = children;
    this.lists = lists;
    this.template = this.props.template;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.ONINIT);
  }

  private _getChildrenAndProps(propsAndChildren: BlockProps): {
    children: Record<string, Block>,
    props: BlockProps,
    lists: Record<string, any[]>
  } {
    const children: Children = {};
    const props: { [key: string]: unknown } = {};
    const lists: { [key: string]: Children[] } = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (
          Array.isArray(value) &&
          value.some((item) => Object.values(item)[0] instanceof Block)
      ) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  private _makePropsProxy(props: any): BlockProps {
    const self = this as Block;

    return new Proxy(props, {
      get(target: { [key: string]: object }, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: { [key: string]: object }, prop: string, value: object) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.ONUPDATE, oldTarget, target);
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
    eventBus.on(Block.EVENTS.ONUNMOUNT, this._componentWillUnmount.bind(this),);
    eventBus.on(Block.EVENTS.ONRENDER, this._render.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.pageChange, this.pageChange.bind(this) as EventCallback);
  }

  protected init(): void {
    console.log("ONINIT:", this.props)
    this.eventBus().emit(Block.EVENTS.ONRENDER);
  }

  private _componentDidMount(): void {
    console.log("ONMOUNT:", this.props)
    if (!this._isMounted) {
      this._isMounted = true;

      Object.values(this.children).forEach(child => {
        child.dispatchComponentDidMount();
      });

      Object.values(this.lists).forEach((childList) => {
        Object.values(childList).forEach((children) =>
            Object.values(children).forEach((child:any) => {
              child.dispatchComponentDidMount();
            }),
        );
      });
    }
  }

  private _componentWillUnmount() {
    console.log("ONUNMOUNT:", this.props)
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidUnMount();
    });

    Object.values(this.lists).forEach((childList) => {
      Object.values(childList).forEach((children) =>
          Object.values(children).forEach((child) => {
            child.dispatchComponentDidUnMount();
          }),
      );
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

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    console.log("ONUPDATE:", this.props)
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    console.log("CDU, old=", oldProps, "new=", newProps);
    return true;
  }

  get element(): HTMLElement {
    return this._element!;
  }

  private _render(): void {
    console.log("ONRENDER:", this.props)
    const propsAndStubs: Record<string, unknown> = { ...this.props };
    const tmpId =  newUuid();

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="${tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(
          `[data-id="${child.id}"]`,
      ) as HTMLElement;
      if (stub) {
        stub.replaceWith(child.getContent()!);
      }
    });

    Object.values(this.lists).forEach((childList) => {
      const stub = fragment.content.querySelector(
          `[data-id="${tmpId}"]`,
      ) as HTMLElement;
      if (stub) {
        const elements = childList
            .map((children) =>
                Object.values(children).map((child) => child.getContent()),
            )
            .flat();

        stub.replaceWith(...elements);
      }
    });

    this._removeEvents();
    const newElement = fragment.content.firstElementChild as HTMLElement;

    // Установка атрибутов для нового элемента
    if (newElement && this.props.attr) {
      Object.entries(this.props.attr).forEach(([key, value]) => {
        newElement.setAttribute(key, value);
      });
    }
    if (this._element) {
      this._element.replaceWith(newElement!);
    }
    this._element = newElement;
    this._addEvents();
  }

  render(): string {
    // 2DO: убрать
    if(!this.template) return '<div>Шаблон потерян</div>'
    return this.template;
  }

  getContent() {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
            this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }
    return this.element;
  }



  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }


  pageChange(a:string): void {
    const ppp : { [key: string]: any } = Pages
    console.log('change in Block', a, ppp, ppp[a])
    const displayPage = new page404();
    this.al = document.getElementById('app');
    this.al?.appendChild(displayPage.getContent());
  }
}
