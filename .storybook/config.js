import React from 'react';
import { configure, setAddon, addParameters, addDecorator } from '@storybook/react';
import chaptersAddon, { setDefaults } from 'react-storybook-addon-chapters';

import '../src/index-storybook.scss';

// Storybook UI Preferences
addParameters({
  options: {
    showPanel: true,
    storySort: (a, b) => a[1].id.localeCompare(b[1].id),
  }
})

// With Chapters Addon Preferences
setDefaults({
  sectionOptions: {
    showSource: false,
    allowSourceToggling: true,
    showPropTables: false,
    allowPropTablesToggling: true,
    decorator: story => (<div>{story()}</div>),
  }
});
setAddon(chaptersAddon);

configure(require.context('../src/', true, /\.stories\.(js|jsx)$/), module);

