export const selectors = {
  id: 'loader',
  stop: 'stop',
}

/*
 * This loader service will start/stop the global
 * loader element by adding/removing the stop class
 * on the loader element.
 *
 * This component expects a loader element to exist on the page
 * (should be embedded in the index.html template so it loads
 * before the app is bootstraped).
 *
 * @see `public/index.html` for more info.
 */
let LoaderService;
export default LoaderService = {
  selectors: selectors,

  getLoader() {
    return document.getElementById(selectors.id);
  },

  start() {
    const l = LoaderService.getLoader();
    if (l) {
     l.classList.remove(selectors.stop);
   }
  },

  stop() {
    const l = LoaderService.getLoader();
    if (l) {
      l.classList.add(selectors.stop);
    }
  },
};
