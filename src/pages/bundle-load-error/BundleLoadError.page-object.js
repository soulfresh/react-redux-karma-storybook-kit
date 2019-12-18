import PageObject from '../../PageObject';
import {
  PageLoaderPageObject,
  pageLoaderSelectors,
} from '~/components/page-objects';

export const selectors = {
  ...pageLoaderSelectors,
  error: '[data-test=error]',
};

export default class BundleLoadErrorPageObject extends PageObject {
  selectors = selectors;

  get errorElement() {
    return this.root.querySelector(selectors.error);
  }

  get errorIsVisible() {
    return !!this.errorElement;
  }
}
