import React from 'react';
import ReactDOM from 'react-dom';

import LoaderService from './loader.service';
import PageLoaderPageObject from './PageLoader.page-object';
import PageLoader from './PageLoader.jsx';

describe('PageLoader', function() {
  let page, loader, app;

  beforeEach(function() {
    page = new PageLoaderPageObject();
  });

  afterEach(() => {
    page.destroySandbox();
  });

  beforeEach(function(done) {
    app = page.render(<PageLoader />, done);
  });

  it('should start the page loader on load.', () => {
    expect(page.loaderIsVisible).toBe(true);
  });

  describe('after being destroyed', function() {
    beforeEach(function() {
      ReactDOM.unmountComponentAtNode(app);
    });

    it('should stop the page loader.', () => {
      expect(page.loaderIsVisible).toBe(false);
    });
  });

});
