import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { chapters } from '~/storybook-chapters';

import * as Buttons from './Buttons.jsx';

storiesOf(chapters.BUTTONS, module)
  .addWithChapters('2. Icon Buttons', {
    chapters: [{
      title: 'Vertical Icon Text Buttons',
      sections: [{
        sectionFn: () => (
          <>
            <Buttons.EditButton onClick={action('onClick')} />
          </>
        )
      }]
    }]
  });
