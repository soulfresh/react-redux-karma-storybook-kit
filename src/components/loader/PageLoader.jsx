import React from 'react';
import LoaderService from './loader.service';

import './PageLoader.scss';

/*
 * Start/Stop the global page loader embedded in the HTML page.
 * This component expects a loader element to exist on the page
 * (should be embedded in the index.html template so it loads
 * before the app is bootstraped).
 *
 * @See `loader.service.jsx`
 */
export default class PageLoader extends React.Component {
  componentDidMount() {
    LoaderService.start();
  }

  componentWillUnmount() {
    LoaderService.stop();
  }

  render() {
    return null;
  }
}
