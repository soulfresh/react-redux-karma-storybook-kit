import React from 'react';

import PageLoaderPageObject from './PageLoader.page-object';
import PageLoader from './PageLoader.jsx';

describe('PageLoader', function() {
  let page, app;

  beforeEach(function() {
    page = new PageLoaderPageObject(null, {app: '#app'});
  });

  afterEach(() => {
    page.destroySandbox();
  });

  beforeEach(function() {
    app = page.render(<PageLoader />);
  });

  it('should start the page loader on load.', () => {
    expect(page.loaderIsVisible).toBe(true);
  });

  describe('after being destroyed', function() {
    beforeEach(function() {
      page.unmount(app);
    });

    it('should stop the page loader.', () => {
      expect(page.loaderIsVisible).toBe(false);
    });
  });

});
