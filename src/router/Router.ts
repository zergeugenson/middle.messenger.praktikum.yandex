import Route from "./Route";

//Router отвечает только за изменение URL и вызывает Route;
class Router {
  static __instance: any;
  routes: any[];
  history: History;
  currentRoute: any;
  private _rootQuery: any;
  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  // Конфигурируем роутер, указывая, на каких URL какую страницу отображать
  use(pathname: string, block: any) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  // запустить роутер
  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = (event: any) => {
      if (event.currentTarget) {
        this._onRoute(event.currentTarget.location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this._getRoute(pathname);

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  //Изменять историю можно через методы pushState (добавляет запись в историю)
  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  // переход назад по истории браузера
  back() {
    this.history.back();
  }

  // переход вперёд по истории браузера
  forward() {
    this.history.forward();
  }

  private _getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
