import PageObject from 'page-o';

export const selectors = {
  loader: '[name=loaderComponent]',
};

export default class LoaderPageObject extends PageObject {
  selectors = selectors;
}
