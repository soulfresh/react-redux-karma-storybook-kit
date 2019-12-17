import { Set } from 'global';

/*
 * Format a date string for display.
 *
 * @param {string} date The date string to parse and format.
 * @param {string} [locale] This should only be passed during testing
 *   unless you have a really good reason to specify the locale.
 */
export function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale, {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric'
    }).format(new Date(date));
}

/*
 * Format a currency value for display.
 *
 * @param {number} pennies - The value in pennies to parse into a currency.
 * @param {string} currency - The currency to use (ex. USD, GBP).
 * @param {string} [locale] - This should only be passed during testing
 *   unless you have a really good reason to specify the locale.
 */
export function formatCurrency(pennies, currency='USD', locale) {
  return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
  }).format(pennies / 100);
}

/*
 * Combine two class strings, removing duplicates and handling
 * empty, null or undefined strings.
 */
export function combineClasses(a, b) {
  if (!a) return b;
  if (!b) return a;
  return [...new Set(
    a.split(' ').concat(b.split(' '))
  )].join(' ').trim();
}
