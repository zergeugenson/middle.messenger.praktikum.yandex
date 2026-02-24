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

export const appRouter = new Router('#app');
document.addEventListener('DOMContentLoaded', () => {
  appRouter
    .use('/', Pages.LoginPage)
    .use('/register', Pages.RegisterPage)
    .use('/error5xx', Pages.Page5xx)
    .use('/error404', Pages.Page404)
    .use('/profile', Pages.ProfilePage)
    .use('/chat', Pages.ChatPage)
    .start();
});

void getUser().then(()=> {
  const { pathname } = window.location;
  appRouter.go(pathname);
});
