import { type PageTypes } from '@/types'
import Route from './Route'

type RouteType = any

export default class Router {
  public routes: RouteType[] | undefined
  public history: History | undefined
  public _currentRoute: null | RouteType
  public _rootQuery: string | undefined
  public _instance: any // Router?

  constructor(rootQuery: string) {
    if (this._instance) {
      return this._instance
    }

    this._rootQuery = rootQuery
    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._instance = this
  }

  use(pathname: string, block: PageTypes): Router {
    if (this._rootQuery) {
      const route = new Route(pathname, block, { rootQuery: this._rootQuery })
      this.routes?.push(route)
    }

    return this
  }

  start(): void {
    window.onpopstate = () => {
      this._onRoute(document.location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname)

    if (this._currentRoute) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  go(pathname: string): void {
    this.history?.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back(): void {
    this.history?.back()
  }

  forward(): void {
    this.history?.forward()
  }

  getRoute(pathname: string): RouteType {
    return this.routes?.find((route) => route.match(pathname))
  }
}
