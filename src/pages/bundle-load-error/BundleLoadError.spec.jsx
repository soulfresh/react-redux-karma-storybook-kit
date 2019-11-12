import React from 'react';

import { LoaderService } from '../../components';
import PageLoaderPageObject from '../../components/loader/PageLoader.page-object';
import BundleLoadErrorPageObject from './BundleLoadError.page-object';
import BundleLoadError from './BundleLoadError.jsx';

describe('BundleLoadError', function() {
  let page, loader, app;

  beforeEach(function() {
    page = new BundleLoadErrorPageObject();
  });

  afterEach(() => {
    page.destroySandbox();
  });

  function prepareSandbox() {
    page.prepareSandbox();

    loader = document.createElement('div');
    loader.setAttribute('id', LoaderService.selectors.id);
    loader.classList.add('loader');
    loader.innerText = 'Loading...';
    page.sandbox.appendChild(loader);

    app = document.createElement('div');
    app.setAttribute('id', 'app');
    page.sandbox.appendChild(app);
  }

  beforeEach(() => {
    prepareSandbox();
  });

  describe('with the error prop', function() {
    beforeEach((done) => {
      const component = (
        <BundleLoadError error={true}>
          <h1 name="no-error">No Error</h1>
        </BundleLoadError>
      );

      page.render(component, done, null, true, app);
    });

    it('should show the error.', () => {
      expect(page.errorIsVisible).toBe(true);
    });

    it('should stop the global loader.', () => {
      const pageLoader = new PageLoaderPageObject(page.sandbox);
      expect(pageLoader.loaderIsVisible).toBe(false);
    });

    it('should not show the child elements.', () => {
      const children = page.sandbox.querySelector('[name=no-error]');
      expect(children).toBeNull();
    });
  });

  describe('without the error prop', function() {
    beforeEach(function(done) {
      const component = (
        <BundleLoadError>
          <h1 name="no-error">No Error</h1>
        </BundleLoadError>
      );

      page.render(component, done, null, true, app);
    });

    it('should not show the error.', () => {
      expect(page.errorIsVisible).toBe(false);
    });

    it('should show the children.', () => {
      const children = page.sandbox.querySelector('[name=no-error]');
      expect(children).not.toBeNull();
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
