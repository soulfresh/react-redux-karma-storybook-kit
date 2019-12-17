import React from 'react';
import { storiesOf } from '@storybook/react';

import { chapters } from '~/storybook-chapters';

import toast from './Toasts.jsx';

const styles = {
  'margin': '10px',
};

storiesOf(chapters.NOTIFICATIONS, module)
  .addWithChapters('Toasts', {
    chapters: [{
      sections: [{
        sectionFn: () => (
          <React.Fragment>
            <button className="success" style={styles}
              onClick={() => toast.success('Things are great! Everything is Awesome!')}
            >
              Success
            </button>
            <button className="warn" style={styles}
              onClick={() => toast.warn('Things are getting shady :\\')}
            >
              Warn
            </button>
            <button className="error" style={styles}
              onClick={() => toast.error('Danger! Danger!')}
            >
              Error
            </button>
            <button style={styles}
              onClick={() => toast.info('Meh')}
            >
              Info
            </button>
          </React.Fragment>
        )
      }]
    }]
  });
