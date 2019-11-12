import React from 'react';
import PropTypes from 'prop-types';

import { Loader } from '~components';

import './NotFound.scss';

export default function NotFound({title, subtitle}) {
  return (
    <div className="not-found" data-test="notFound">
      <h2 className="title" data-test="title">{ title }</h2>
      { subtitle &&
        <p className="subtitle" data-test="subtitle">{ subtitle }</p>
      }
      <Loader />
    </div>
  );
}

NotFound.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
