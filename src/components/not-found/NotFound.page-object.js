import { LoaderPageObject } from '../loader/page-objects';

export const selectors = {
  container: '[data-test=notFound]',
  root: '[data-test=notFound]',
  title: '[data-test=title]',
  subtitle: '[data-test=subtitle]',
};

export default class NotFoundPageObject extends LoaderPageObject {
  get loaderElement() {
    return this.root.querySelector(selectors.root);
  }

  get titleElement() {
    return this.loaderElement.querySelector(selectors.title);
  }

  get titleText() {
    return this.titleElement.textContent.trim();
  }

  get subtitleElement() {
    return this.loaderElement.querySelector(selectors.subtitle);
  }

  get subtitleIsVisible() {
    return !!this.subtitleElement;
  }

  get subtitleText() {
    return this.subtitleElement.textContent.trim();
  }
}
