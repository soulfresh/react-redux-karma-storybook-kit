import PageObject from 'page-o';

export const selectors = {
  container: '[data-test=checkbox]',
  input: 'input',
  checkedIcon: '[data-test=checked]',
  uncheckedIcon: '[data-test=unchecked]',
};

export default class CheckboxPageObject extends PageObject {
  selectors = selectors;
}
