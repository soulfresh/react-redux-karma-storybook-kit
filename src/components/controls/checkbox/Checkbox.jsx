import React from 'react';
import PropTypes from 'prop-types';

import {ReactComponent as Circle} from '~assets/icons/square.svg';
import {ReactComponent as Check} from '~assets/icons/check-square.svg';

import './Checkbox.scss';

export default function Checkbox({
  checked,
  name,
  value,
  onChange,
}) {
  const inputProps = {};
  if (value) inputProps.value = value;
  if (name) inputProps.name = name;
  inputProps.checked = !!inputProps.checked;

  const icon = checked
    ? <Check className="icon checked" data-test="checked" />
    : <Circle className="icon unchecked" data-test="unchecked" />;

  return (
    <span className="checkbox" data-test="checkbox">
      {icon}
      <input type="checkbox" onChange={onChange} {...inputProps} />
    </span>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
