import { type PageTypes } from '@/types';
import Route from './Route';
import { appRoutes } from '@/main';

type RouteType = any;

export default class Router {
  public routes: any[] | undefined;

  public history: History | undefined;

  public _currentRoute: any;

  public _rootQuery: string | undefined;

  public _instance: Router;

  constructor(rootQuery: string) {
    if (this._instance) {
      return this._instance;
    }

    this._rootQuery = rootQuery;
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._instance = this;
  }

  use(pathname: string, block: PageTypes): Router {
    if (this._rootQuery) {
      const route = new Route(pathname, block, { rootQuery: this._rootQuery });
      this.routes?.push(route);
    }

    return this;
  }

  start(): void {
    window.onpopstate = () => {
      this._onRoute(document.location.pathname);
    };
    // this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);




    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    const { isAuthorized } = window.store.getState();
    const isAuthorizedPage =
        pathname === appRoutes.SignIn || pathname === appRoutes.SignUp;
    const isProtectedPage =
        pathname !== appRoutes.SignIn && pathname !== appRoutes.SignUp;

    if (!route || !Object.values(appRoutes).includes(pathname)) {
      // 404
      this.go(appRoutes.Error404);
    } else if (!isAuthorized && isProtectedPage) {
      // не авторизован
      this.go(appRoutes.SignIn);
    } else if (isAuthorized && isAuthorizedPage) {
      // авторизован, но идет на логин
      this.go(appRoutes.Settings);

    } else {
      this._currentRoute = route;
      route.render();
    }
  }

  go(pathname: string): void {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history?.back();
  }

  forward(): void {
    this.history?.forward();
  }

  getRoute(pathname: string): RouteType {
    return this.routes?.find((route) => route.match(pathname));
  }
}
