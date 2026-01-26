import App from './App.ts';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.renderPage();
});

document.addEventListener('pageChange', () => {
  console.log("beeee")
});
