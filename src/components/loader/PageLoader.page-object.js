import { LoaderService } from '../../components';
import PageObject from 'page-o';

export const selectors = {
  loader: '[data-test=loader]',
};

export default class PageLoaderPageObject extends PageObject {
  selectors = selectors;

  render(component, done, styles) {
    return super.render(
      component,
      styles,
      `
        <div
          id="${LoaderService.selectors.id}"
          data-test="loader"
          class="loader ${LoaderService.selectors.stop}"
        >Loading...</div>
      `
    );
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
