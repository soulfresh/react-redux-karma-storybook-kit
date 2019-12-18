import React from 'react';

import LoaderService from './loader.service';
import PageObject from '~/PageObject';

import {ReactComponent as LoaderIcon} from './icon/loader.svg';

export const selectors = {
  loader: '[data-test=loader]',
};

export default class PageLoaderPageObject extends PageObject {
  selectors = selectors;

  render(component, done) {
    this.prepareSandbox();

    const loader = document.createElement('div');
    loader.setAttribute('id', LoaderService.selectors.id);
    loader.setAttribute('data-test', 'loader');
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
