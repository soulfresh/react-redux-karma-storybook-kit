import React from 'react';
import LoaderService from './loader.service';

import './Loader.scss';

/*
 * Create a loader element similar to the page loader.
 */
export default class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.rootRef = React.createRef();
  }

  get rootElement() {
    return this.rootRef.current;
  }

  cloneLoader() {
    const loader = LoaderService.getLoader().cloneNode(true);
    loader.removeAttribute('id');
    loader.setAttribute('name', 'loaderComponent');
    loader.classList.remove(LoaderService.selectors.stop);
    return loader;
  }

  componentDidMount() {
    this.loader = this.cloneLoader();
    this.rootElement.appendChild(this.loader);
  }

  render() {
    return (
      <div className="loader-component" ref={this.rootRef}>
      </div>
    );
  }
}
