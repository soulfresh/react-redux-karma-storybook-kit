import React from 'react';
import PropTypes from 'prop-types';
import classSet from 'react-classset';
import toastedNotes from 'toasted-notes';

import {
  RemoveButton,
} from '../buttons';

import './Toasts.scss';

const DEFAULT_DURATION = 3000;

const toast = {
  notify(message, duration = DEFAULT_DURATION) {
    toastedNotes.notify(({onClose}) =>
      <InfoToast message={message} onClose={onClose} />, { duration: duration }
    );
  },

  info(message, duration = DEFAULT_DURATION) {
    toastedNotes.notify(({onClose}) =>
      <InfoToast message={message} onClose={onClose} />, { duration: duration }
    );
  },

  success(message, duration = DEFAULT_DURATION) {
    toastedNotes.notify(({onClose}) =>
      <SuccessToast message={message} onClose={onClose} />, { duration: duration }
    );
  },

  warn(message, duration = DEFAULT_DURATION) {
    toastedNotes.notify(({onClose}) =>
      <WarningToast message={message} onClose={onClose} />, { duration: duration }
    );
  },

  error(message, duration = DEFAULT_DURATION) {
    toastedNotes.notify(({onClose}) =>
      <ErrorToast message={message} onClose={onClose} />, { duration: duration }
    );
  },

  closeAll() {
    console.log(toastedNotes);
    toastedNotes.closeAll();
  }
};

export default toast;

function Toast({
  children,
  onClose,
  className,
  ...rest
}) {
  const classes = classSet({
    'toast': true,
    [className]: !!className,
  });

  return (
    <div className={classes} {...rest}>
      { children }
      <RemoveButton onClick={onClose} />
    </div>
  );
}

export function InfoToast({
  message,
  onClose,
}) {
  return (
    <Toast className="info" onClose={onClose} data-test="infoToast">
      <div className="message">{ message }</div>
    </Toast>
  );
}

InfoToast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export function SuccessToast({
  message,
  onClose,
}) {
  return (
    <Toast className="success" onClose={onClose} data-test="successToast">
      <div className="message">{ message }</div>
    </Toast>
  );
}

SuccessToast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export function WarningToast({
  message,
  onClose,
}) {
  return (
    <Toast className="warning" onClose={onClose} data-test="warningToast">
      <div className="message">{ message }</div>
    </Toast>
  );
}

WarningToast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export function ErrorToast({
  message,
  onClose,
}) {
  return (
    <Toast className="error" onClose={onClose} data-test="errorToast">
      <div className="message">{ message }</div>
    </Toast>
  );
}

ErrorToast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

