import React from 'react';

import { LoaderService } from '../../components';
import PageLoaderPageObject from '../../components/loader/PageLoader.page-object';
import BundleLoadErrorPageObject from './BundleLoadError.page-object';
import BundleLoadError from './BundleLoadError.jsx';

describe('BundleLoadError', function() {
  let page, loader, app;

  // We create our own sandbox in this test because we need
  // the loader to be started before the BundleLoadError component
  // is created.
  function prepareSandbox() {
    page.prepareSandbox();

    loader = document.createElement('div');
    loader.setAttribute('id', LoaderService.selectors.id);
    loader.setAttribute('data-test', 'loader');
    loader.classList.add('loader');
    loader.innerText = 'Loading...';
    page.sandbox.appendChild(loader);

    app = document.createElement('div');
    app.setAttribute('id', 'app');
    page.sandbox.appendChild(app);
  }

  beforeEach(function() {
    page = new BundleLoadErrorPageObject(null, {noError: '[data-test=noError]'});
    prepareSandbox();
  });

  afterEach(() => {
    page.destroySandbox();
  });

  describe('with the error prop', function() {
    beforeEach((done) => {
      const component = (
        <BundleLoadError error={true}>
          <h1 data-test="noError">No Error</h1>
        </BundleLoadError>
      );

      page.render(component, done, null, true, app);
    });

    it('should show the error.', () => {
      expect(page.error.exists).toBe(true);
    });

    it('should stop the global loader.', () => {
      const pageLoader = new PageLoaderPageObject(page.sandbox);
      expect(pageLoader.loaderIsVisible).toBe(false);
    });

    it('should not show the child elements.', () => {
      expect(page.noError.exists).toBe(false);
    });
  });

  describe('without the error prop', function() {
    beforeEach(function(done) {
      const component = (
        <BundleLoadError>
          <h1 data-test="noError">No Error</h1>
        </BundleLoadError>
      );

      page.render(component, done, null, true, app);
    });

    it('should not show the error.', () => {
      expect(page.errorIsVisible).toBe(false);
    });

    it('should show the children.', () => {
      expect(page.noError.exists).toBe(true);
    });

    // Stopping the global loader is the responsibility of children
    // once they have fully loaded and initialized.
    it('should not stop the global loader.', () => {
      const pageLoader = new PageLoaderPageObject(page.sandbox);
      expect(pageLoader.loaderIsVisible).toBe(true);
    });
  });

  // TODO Figure out how to call getDerivedStateFromError.
  xdescribe('after getDerivedStateFromError is called', function() {
    xit('should show the error.', () => {});
    xit('should stop the global loader.', () => {});
    xit('should not show the child elements.', () => {});
  });
});
