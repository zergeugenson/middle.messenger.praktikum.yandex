// import App from './App.js';
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new App();
//   app.renderPage();
// });


import * as Pages from '@/Pages'
import Router from '@/router/Router'


export const appRouter = new Router('#app')

document.addEventListener('DOMContentLoaded', () => {
  appRouter
      .use('/', Pages.LoginPage)
      .use('/register', Pages.RegisterPage)
      .use('/error500', Pages.Page5xx)
      .use('/error404', Pages.Page404)
      .use('/profile', Pages.ProfilePage)
      .use('/chat', Pages.ChatPage)
      .start()
})
