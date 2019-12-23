import { LoaderService } from '~/components';
import PageObject from 'page-o';

export const selectors = {
  error: '[data-test=error]',
};

export default class BundleLoadErrorPageObject extends PageObject {
  selectors = selectors;

  render(component, done, styles) {
    return super.render(
      component,
      styles,
      `
        <div
          id="${LoaderService.selectors.id}"
          data-test="loader"
          class="loader"
        >Loading...</div>
      `
    );
  }

  get errorElement() {
    return this.root.querySelector(selectors.error);
  }

  get errorIsVisible() {
    return !!this.errorElement;
  }
}
