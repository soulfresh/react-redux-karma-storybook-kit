import PageObject from 'page-o';

export const selectors = {
  form: '[data-test=loginForm]',
  username: '[data-test=username]',
  password: '[data-test=password]',
  submit: '[data-test=submit]',
};

export default class LoginPageObject extends PageObject {
  selectors = selectors;
}
