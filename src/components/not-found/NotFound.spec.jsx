import React from 'react';

import NotFound from './NotFound.jsx';
import NotFoundPageObject from './NotFound.page-object';

describe('NotFound', function() {
  let page;
  const title = "Foo Not Found";
  const subtitle = "Where did you leave it last?";

  beforeEach(function() {
    page = new NotFoundPageObject();
  });

  afterEach(function() {
    page.destroySandbox();
  });

  describe('with a subtitle', () => {
    beforeEach(function() {
      page.render(
        <NotFound title={title} subtitle={subtitle} />
      );
    });

    it('should display the title.', () => {
      expect(page.titleText).toEqual(title);
    });

    it('should display the subtitle.', () => {
      expect(page.subtitleText).toEqual(subtitle);
    });

    it('should display the loader.', () => {
      expect(page.loaderIsVisible).toBe(true);
    });
  });

  describe('without a subtitle', function() {
    beforeEach(function() {
      page.render(
        <NotFound title={title} />
      );
    });

    it('should not display the subtitle.', () => {
      expect(page.subtitleIsVisible).toBe(false);
    });

    it('should display the title.', () => {
      expect(page.titleText).toEqual(title);
    });

    it('should display the loader.', () => {
      expect(page.loaderIsVisible).toBe(true);
    });
  });
});
