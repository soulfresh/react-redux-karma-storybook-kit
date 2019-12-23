import React from 'react';

import LoaderPageObject from './Loader.page-object';
import Loader from './Loader.jsx';

describe('Loader', function() {
  let page;

  beforeEach(function() {
    page = new LoaderPageObject();
  });

  afterEach(() => {
    page.destroySandbox();
  });

  beforeEach(function() {
    page.render(<Loader />);
  });

  it('should show the loader.', () => {
    expect(page.loader.exists).toBe(true);
  });
});
