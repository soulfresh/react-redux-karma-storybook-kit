import PageObject from '~/PageObject';
import { LabeledInputPageObject } from '~/components/page-objects';

export const selectors = {
  form: '[data-test=loginForm]',
  username: '[data-test=username]',
  password: '[data-test=password]',
  submit: '[data-test=submit]',
};

export default class LoginPageObject extends PageObject {
  selectors = selectors;
}
