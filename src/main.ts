import * as Pages from '@/pages';
import Router from '@/router/Router';
import { Store } from '@/store';
import type { AppState } from '@/types';
import { initState } from '@/store';
import { getUser } from '@/controllers/authController';

declare global {
  interface Window {
    store: Store<AppState>
  }
}
window.store = new Store<AppState>(initState);

export const appRoutes:{[key:string]:string} = {
  SignIn:'/',
  SignUp:'/sign-up',
  Messenger:'/messenger',
  Settings:'/settings',
  Error404:'/404',
  Error500:'/500',
}

export const appRouter = new Router('#app');

document.addEventListener('DOMContentLoaded', () => {
  appRouter
    .use( appRoutes.SignIn, Pages.LoginPage)
    .use( appRoutes.SignUp, Pages.RegisterPage)
    .use( appRoutes.Error500, Pages.Page5xx)
    .use( appRoutes.Error404, Pages.Page404)
    .use( appRoutes.Settings, Pages.ProfilePage)
    .use( appRoutes.Messenger, Pages.ChatPage)
    .start();
});

void getUser().then(()=> {
  const { pathname } = window.location;
  appRouter.go(pathname);
});
