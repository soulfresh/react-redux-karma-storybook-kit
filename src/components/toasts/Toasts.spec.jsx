import toast from './Toasts.jsx';
import ToastsPageObject from './Toasts.page-object';

describe('Toasts', function() {
  let page;
  const message = 'This is my message to you. Do not worry.';

  beforeEach(function() {
    page = new ToastsPageObject();
    page.prepareSandbox();
  });

  afterEach(function() {
    page.destroySandbox();
    // TODO With the next major release of toasted notes,
    // we should be able to closeAll toasts.
    // toast.closeAll();
  });

  it('should be able to show a success toast.', () => {
    toast.success(message, 60);
    expect(page.success.exists).toBe(true);
    expect(page.success.text).toEqual(message);
  });

  it('should be able to show an info toast.', () => {
    toast.info(message, 60);
    expect(page.info.exists).toBe(true);
    expect(page.info.text).toEqual(message);
  });

  it('should be able to show a warning toast.', () => {
    toast.warn(message, 60);
    expect(page.warning.exists).toBe(true);
    expect(page.warning.text).toEqual(message);
  });

  it('should be able to show an error toast.', () => {
    toast.error(message, 60);
    expect(page.error.exists).toBe(true);
    expect(page.error.text).toEqual(message);
  });
});
