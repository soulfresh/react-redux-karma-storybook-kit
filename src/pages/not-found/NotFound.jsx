import React from 'react';

import { NotFound as NotFoundComponent } from '~components';

import './NotFound.scss';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <NotFoundComponent title="Page Not Found" />
    </div>
  );
}
