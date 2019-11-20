import React from 'react';

import Checkbox from './Checkbox.jsx';
import CheckboxPageObject from './Checkbox.page-object';

describe('Checkbox', function() {
  let page, onChange;

  beforeEach(function() {
    page = new CheckboxPageObject();
    onChange = jasmine.createSpy('onChange');
  });

  afterEach(function() {
    page.destroySandbox();
  });

  describe('by default', function() {
    beforeEach(function() {
      page.render(
        <Checkbox checked={true} value="foo" onChange={onChange} />
      );
    });

    it('should show the correct icon.', () => {
      expect(page.checkedIcon.exists).toBe(true);
      expect(page.uncheckedIcon.exists).toBe(false);
    });

    it('should set the input value.', () => {
      expect(page.input.checked).toEqual(true);
    });

    describe('after clicking on the checkbox', function() {
      beforeEach(function(done) {
        page.input.click();
        setTimeout(done, 60);
      });

      it('should emit the change event.', () => {
        expect(onChange).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when the initial value is false', function() {
    beforeEach(function() {
      page.render(
        <Checkbox checked={false} value="foo" onChange={onChange} />
      );
    });

    it('should show the correct icon.', () => {
      expect(page.checkedIcon.exists).toBe(false);
      expect(page.uncheckedIcon.exists).toBe(true);
    });

    it('should set the input value.', () => {
      expect(page.input.checked).toEqual(false);
    });
  });
});
