import PageObject from '../../PageObject';

export const selectors = {
  error: '[data-test=error]',
};

export default class BundleLoadErrorPageObject extends PageObject {
  get errorElement() {
    return this.root.querySelector(selectors.error);
  }

  get errorIsVisible() {
    return !!this.errorElement;
  }
}
