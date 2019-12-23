import React from 'react';

import { PageLoader } from '../../components';
import './BundleLoadError.scss';

/*
 * This class is intended to be used as an ErrorBoundary to catch any issues
 * with loading the top level app bundles.
 */
export default class BundleLoadError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: props.error != null ? props.error : false,
    };
  }

  get error() {
    return this.state.error;
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Bundle failed to load!');
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.error) {
      return (
        <div className="bundle-load-error" data-test="error">
          <h2 className="title">An error occurred loading {process.env.REACT_APP_NAME}</h2>
          <h3>Please try again in a bit</h3>
          <PageLoader />
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
