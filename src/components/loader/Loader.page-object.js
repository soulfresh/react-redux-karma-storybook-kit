import PageObject from '../../PageObject.js';
import LoaderService from './loader.service';

export const selectors = {
  loader: '[name=loaderComponent]',
};

export default class LoaderPageObject extends PageObject {
  render(component, done) {
    this.prepareSandbox();

    const loader = document.createElement('div');
    loader.setAttribute('id', LoaderService.selectors.id);
    loader.classList.add('loader', LoaderService.selectors.stop);
    loader.innerText = 'Loading...';
    this.sandbox.appendChild(loader);

    const app = document.createElement('div');
    app.setAttribute('id', 'app');
    this.sandbox.appendChild(app);

    super.render(component, done, null, true, app);

    return app;
  }

  get loaderElement() {
    return this.root.querySelector(selectors.loader);
  }

  get loaderText() {
    return this.loaderElement.textContent.trim();
  }

  get loaderIsVisible() {
    return !this.loaderElement.classList.contains(LoaderService.selectors.stop);
  }
}
