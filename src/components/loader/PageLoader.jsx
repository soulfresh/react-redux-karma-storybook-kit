import React from 'react';
import LoaderService from './loader.service';

/*
 * Start/Stop the global page loader embedded in the HTML page.
 * This component expects a loader element to exist on the page
 * (should be embedded in the index.html template so it loads
 * before the app is bootstraped).
 *
 * @See `loader.service.jsx`
 */
export default function PageLoader() {
  React.useEffect(() => {
    LoaderService.start();

    return () => LoaderService.stop();
  }, []);

  return null;
}
