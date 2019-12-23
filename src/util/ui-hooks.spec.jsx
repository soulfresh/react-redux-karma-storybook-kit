import React from 'react';
import PageObject from 'page-o';

import {
  useScrollToTop,
  useId,
} from './ui-hooks';

describe('UI Hooks', function() {
  let page;

  beforeEach(function() {
  });

  describe('useScrollToTop', function() {
    const Component = (props) => {
      const id = useScrollToTop();
      return <div {...props}></div>;
    };

    beforeEach(function() {
      spyOn(window, 'scroll');

      page = new PageObject(null, {
        foo: '[data-test=foo]',
      });

      page.render(<Component data-test="foo" />);
    });

    it('should scroll to the top of the page on load.', () => {
      expect(window.scroll).toHaveBeenCalledTimes(1);
      expect(window.scroll).toHaveBeenCalledWith(0, 0);
    });
  });

  describe('useId', function() {
    const prefix = 'baz';

    const Component = (props) => {
      const id = useId(prefix);
      return <div data-id={id} {...props}></div>;
    };

    beforeEach(function() {
      page = new PageObject(null, {
        foo: '[data-test=foo]',
        bar: '[data-test=bar]',
      });
      page.render(
        <React.Fragment>
          <Component data-test="foo" />
          <Component data-test="bar" />
        </React.Fragment>
      );
    });

    it('should generate a unique id.', () => {
      const foo = page.foo.element.getAttribute('data-id');
      const bar = page.bar.element.getAttribute('data-id');

      expect(foo).not.toEqual(bar);
      expect(foo).toStartWith(prefix);
      expect(bar).toStartWith(prefix);

      const fooId = Number(foo.split('-')[1]);
      const barId = Number(bar.split('-')[1]);

      expect(fooId).not.toEqual(barId);
      expect(fooId).toBeGreaterThan(0);
      expect(barId).toBeGreaterThan(0);
    });
  });
});
