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
    app = page.render(<Loader />, done);
  });

  it('should clone the loader element.', () => {
    expect(page.loaderText).toEqual('Loading...');
    expect(page.loaderElement.getAttribute('id')).toBeNull();
  });

  it('should leave the page loader element alone', () => {
    const pageLoader = new PageLoaderPageObject(page.sandbox);
    expect(pageLoader.loaderElement).toBeDefined();
    expect(pageLoader.loaderElement).not.toBeNull();
  });

  describe('after being destroyed', function() {
    beforeEach(function() {
      ReactDOM.unmountComponentAtNode(app);
    });

    it('should remove the cloned element.', () => {
      expect(page.loaderElement).toBeNull();
    });
  });
});
