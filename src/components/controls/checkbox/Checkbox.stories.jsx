import React, {useState} from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';

import Checkbox from './Checkbox.jsx';

function Example() {
  const [value, setValue] = useState(false);
  const onChange = () => {
    actions('onChange');
    setValue(!value);
  };
  return <Checkbox value={value} onChange={onChange} />
}

storiesOf('Checkbox', module)
  .addWithChapters('Checkbox', {
    chapters: [{
      sections: [{
        sectionFn: () => <Example />
      }]
    }]
  });
