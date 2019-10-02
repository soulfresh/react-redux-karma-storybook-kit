import { configure } from '@storybook/react';

import '../src/storybook-index.scss';

configure(require.context('../src/', true, /\.stories\.(js|jsx)$/), module);

