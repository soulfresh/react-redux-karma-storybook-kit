import React from 'react';

import './Loader.scss';

import { ReactComponent as LoaderIcon } from './icon/loader.svg';
import './icon/loader.css';

export default function Loader() {
  return (
    <div className="loader-component">
      <LoaderIcon name="loaderComponent" className="loader" />
    </div>
  );
}
