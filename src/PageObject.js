import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

/*
 * Use this class as the basis for your component page objects.
 * It simplifies creating a sandbox into which components can
 * be rendered. You can also use it to add custom stylesheets
 * for a test.
 *
 * `render()`
 *   Use this method to render your component JSX. It will create
 *   or update the sandbox node in the DOM and then render your
 *   component into that.
 *
 * `destroy()`
 *   Use this to destroy the testing sandbox in an afterEach in your tests.
 */
export default class PageObject {
  /*
   * @param {HTMLElement} [root] The DOM element to use as the root
   *   from which DOM selections are made. If you don't pass a root
   *   here, the sandbox element will be used.
   */
  constructor(root) {
    this._root = root;
  }

  get root() {
    return this._root ? this._root : this.sandbox;
  }

  /*
   * Render your component into the sandbox. If the sandbox doesn't
   * exist, it will be created for you.
   *
   * @param {JSX} definition The component JSX to render.
   * @param {Function} [done] A callback that will be called after
   *   the component has been rendered by ReactDOM.
   * @param {string} [styles] A CSS string to add test specific
   *   styles to the sandbox. These styles will be removed when
   *   the sandbox is destroyed.
   * @param {boolean} [reuse=false] False = create a fresh sandbox DOM.
   *   True = reuse the existing sandbox.
   * @param {HTMLElement} [parent] The parent into which the component
   *   will be rendered. Defaults to the sandbox root.
   */
  render(definition, done, styles=null, reuse=false, parent=null) {
    if (!reuse) {
      this.prepareSandbox(reuse);
    }

    if (styles) {
      this.setStyles(styles);
    }

    parent = parent || this.sandbox;

    act(() => {
      ReactDOM.render(definition, parent, done);
    });
  }

  /*
   * Re-render an existing component; for example when you want to
   * change it's props.
   */
  rerender(definition, done, parent=null) {
    this.render(definition, done, undefined, true, parent);
  }

  /*
   * Remove the sandbox element and the custom style element from
   * the DOM and unmount the component under test.
   */
  destroySandbox() {
    this.removeStyles();

    if (this.sandbox) {
      ReactDOM.unmountComponentAtNode(this.sandbox);
      this.sandbox.remove();
    }
  }

  makeStyleElement() {
    let node = document.createElement('style');
    node.setAttribute('id', 'floorplan-styles');
    document.body.appendChild(node);
    return node;
  }

  getStyleElement() {
    return document.body.querySelector('#floorplan-styles');
  }

  setStyles(str) {
    let node = this.getStyleElement();
    if (!node) {
      node = this.makeStyleElement();
    }

    node.innerHTML = str;
  }

  removeStyles() {
    let node = this.getStyleElement();
    if (node) {
      node.remove();
    }
  }

  prepareSandbox() {
    this.destroySandbox();
    this.sandbox = document.createElement('div');
    this.sandbox.setAttribute('id', 'sandbox-root');
    document.body.appendChild(this.sandbox);
  }
}
