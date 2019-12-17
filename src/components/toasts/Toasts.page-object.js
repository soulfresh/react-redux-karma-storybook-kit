import PageObject from '~/PageObject';

export const selectors = {
  container: '#react-toast',
  info: '[data-test=infoToast]',
  success: '[data-test=successToast]',
  warning: '[data-test=warningToast]',
  error: '[data-test=errorToast]',
};

export default class ToastsPageObject extends PageObject {
  selectors = selectors;

  get root() {
    return document.body.querySelector(selectors.container);
  }
}
