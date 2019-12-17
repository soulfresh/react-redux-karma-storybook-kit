import React, {useState} from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Checkbox from './Checkbox.jsx';

function Example() {
  const [checked, setChecked] = useState(true);
  const log = action('onChange');
  const onChange = (e) => {
    log(e);
    setChecked(!checked);
  };
  return <Checkbox checked={checked} onChange={onChange} />
}

storiesOf('Checkbox', module)
  .addWithChapters('Checkbox', {
    chapters: [{
      sections: [{
        sectionFn: () => <Example />
      }]
    }]
  });
