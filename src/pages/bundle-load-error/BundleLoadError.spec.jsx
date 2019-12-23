import React from 'react';

import PageLoaderPageObject from '../../components/loader/PageLoader.page-object';
import BundleLoadErrorPageObject from './BundleLoadError.page-object';
import BundleLoadError from './BundleLoadError.jsx';

describe('BundleLoadError', function() {
  let page;

  beforeEach(function() {
    page = new BundleLoadErrorPageObject();
  });

  afterEach(() => {
    page.destroySandbox();
  });

  describe('with the error prop', function() {
    beforeEach(() => {
      page.render(
        <BundleLoadError error={true}>
          <h1 name="no-error">No Error</h1>
        </BundleLoadError>
      );
    });

    it('should show the error.', () => {
      expect(page.errorIsVisible).toBe(true);
    });

    it('should show the page loader.', () => {
      const pageLoader = new PageLoaderPageObject(page.sandbox);
      expect(pageLoader.loaderIsVisible).toBe(true);
    });

    it('should not show the child elements.', () => {
      const children = page.sandbox.querySelector('[name=no-error]');
      expect(children).toBeNull();
    });
  });

  describe('without the error prop', function() {
    beforeEach(function() {
      page.render(
        <BundleLoadError>
          <h1 name="no-error">No Error</h1>
        </BundleLoadError>
      );
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
