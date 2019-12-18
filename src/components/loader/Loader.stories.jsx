import React from 'react';
import { storiesOf } from '@storybook/react';

import Loader from './Loader.jsx';
import PageLoader from './PageLoader.jsx';

import { ReactComponent as LoaderIcon } from './icon/loader.svg';
import './icon/loader.scss';

const loaderStyles = {
  height: '50px',
  display: 'flex',
};

const pageLoaderStyles = {
  position: 'relative',
  height: '200px',
};

function wrap(component) {
  return (
    <div style={loaderStyles}>
      { component }
    </div>
  );
};

storiesOf('Loader', module)
  .addWithChapters('Loader', {
    chapters: [{
      title: 'Page Loader Component',
      info: 'The PageLoader component allows you to show/hide the top level ' +
            'loader element embedded into the *index.html* file. You should ' +
            'use this component when loading/transitioning between pages.',
      sections: [{
        info: ` During the build the loader SVG from the "components/loader/icon"
                folder is embedded into the *index.html* file so that it
                is visible before the App boostraps.`,
        sectionFn: () => (
          <div style={pageLoaderStyles}>
            <LoaderIcon />
            <PageLoader />
          </div>
        )
      }]
    }, {
      title: 'Loader Component',
      info: `The Loader component allows you to nest a loader
             inside another component.`,
      sections: [{
        sectionFn: () => (
          wrap(<Loader />)
        )
      }]
    }]
  });
