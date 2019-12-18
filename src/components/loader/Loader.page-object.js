import PageObject from '../../PageObject.js';
import LoaderService from './loader.service';

export const selectors = {
  loader: '[name=loaderComponent]',
};

export default class LoaderPageObject extends PageObject {
  selectors = selectors;
}
