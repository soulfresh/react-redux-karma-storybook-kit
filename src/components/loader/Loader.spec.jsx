import React from 'react';
import ReactDOM from 'react-dom';

import LoaderPageObject from './Loader.page-object';
import PageLoaderPageObject from './PageLoader.page-object';
import Loader from './Loader.jsx';

describe('Loader', function() {
  let page, loader, app;

  beforeEach(function() {
    page = new LoaderPageObject();
  });

  afterEach(() => {
    page.destroySandbox();
  });

  beforeEach(function(done) {
    page.render(<Loader />, done);
  });

  it('should show the loader.', () => {
    expect(page.loader.exists).toBe(true);
  });
});
