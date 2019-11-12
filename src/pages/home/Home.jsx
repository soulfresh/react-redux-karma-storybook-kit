import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import {
  Router,
  Route,
  Switch
} from "react-router-dom";
// import Router from './DebugRouter';

import createStore from '../../store';
import { getRoute } from '../../store/routes';
import {
  PageLoader,
} from '~components';

import './Home.scss';

let store;
let _authFailure;
let handleAuthFailure = () => {
  // Wait until the current render is complete
  // before re-rendering to the Login page.
  setTimeout(_authFailure);
}

export default function Home({
  onAuthFailure,
  history,
}) {
  _authFailure = onAuthFailure;
  if (!store) {
    store = createStore(handleAuthFailure);
  }

  return (
    <div className="home">
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={<PageLoader />}>
            <Switch>
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </div>
  );
}
