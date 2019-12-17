import {
  formatDate,
  formatCurrency,
  combineClasses,
} from './format';

describe('format', function() {
  describe('formatData', function() {
    it('should format dates correctly', () => {
      [
        {date: new Date('December 17, 1995 03:24:00'), expected: '12/17/95'},
        {date: new Date('August 21, 1979 09:15:00'), expected: '8/21/79'},
      ].forEach(({date, expected}) => {
        expect(formatDate(date, 'en-US')).toEqual(expected);
      });
    });
  });

  describe('formCurrency', function() {
    it('should be able to format currency correctly.', () => {
      [
        {value: 105600, currency: 'USD', expected: '$1,056'},
        {value: 239800, currency: 'EUR', expected: '€2,398'},
      ].forEach(({currency, value, expected}) => {
        expect(formatCurrency(value, currency)).toEqual(expected);
      });
    });
  });

  describe('combineClasses', function() {
    it('should be able to combine class lists correctly.', () => {
      expect(combineClasses('foo bar', 'baz')).toEqual('foo bar baz');
      expect(combineClasses('foo', 'baz')).toEqual('foo baz');
      expect(combineClasses('foo bar', 'baz bar bar')).toEqual('foo bar baz');
      expect(combineClasses('foo', 'foo')).toEqual('foo');
      expect(combineClasses('', 'foo')).toEqual('foo');
      expect(combineClasses('foo', '')).toEqual('foo');
      expect(combineClasses(undefined, 'foo')).toEqual('foo');
      expect(combineClasses('foo', undefined)).toEqual('foo');
      expect(combineClasses(undefined, undefined)).not.toBeDefined();
    });
  });
});
