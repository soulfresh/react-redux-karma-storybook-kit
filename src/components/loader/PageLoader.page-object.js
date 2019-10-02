import LoaderService from './loader.service';
import LoaderPageObject from './Loader.page-object';

export const selectors = {
};

export default class PageLoaderPageObject extends LoaderPageObject {
  get loaderElement() {
    return LoaderService.getLoader();
  }

  get loaderIsVisible() {
    return !this.loaderElement.classList.contains(LoaderService.selectors.stop);
  }
}
