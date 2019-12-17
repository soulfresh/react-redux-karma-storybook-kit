import React, {forwardRef} from 'react';

import {
  combineClasses,
} from '~util';

import './Buttons.scss';

import { ReactComponent as EditIcon } from '~assets/icons/edit.svg';
import { ReactComponent as CloseIcon } from '~assets/icons/x.svg';

console.log('combineClasses', combineClasses);
export const IconButton = forwardRef(({className, children, ...rest}, ref) => {
  return (
    <button
      {...rest}
      ref={ref}
      aria-label={ rest['aria-label'] || 'edit' }
      data-test={ rest['data-test'] || 'editButton' }
      className={combineClasses('icon-button transparent', className)}
      type="button"
    >
      { children }
    </button>
  );
});


// VERTICAL
export const EditButton = forwardRef(({className, ...rest}, ref) => {
  return (
    <IconButton className={combineClasses('vertical', className)} {...rest} ref={ref} >
      <EditIcon className="icon with-text edit" />
      Edit
    </IconButton>
  );
});

// NO TEXT
export const CloseButton = forwardRef(({...rest}, ref) => {
  return (
    <IconButton {...rest} ref={ref} >
      <CloseIcon className="icon close" />
    </IconButton>
  );
});

export const RemoveButton = forwardRef(({className, ...rest}, ref) => {
  return (
    <IconButton className={combineClasses('small', className)} {...rest} ref={ref} >
      <CloseIcon className="icon remove" />
    </IconButton>
  );
});

