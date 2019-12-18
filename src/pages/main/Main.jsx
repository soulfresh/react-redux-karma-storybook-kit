import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

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
} from '~/components';
import {
  Home,
  NotFound,
} from '~/pages';

import './Main.scss';

let store;
let _authFailure;
let handleAuthFailure = () => {
  // Wait until the current render is complete
  // before re-rendering to the Login page.
  setTimeout(_authFailure);
}

export default function Main({
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
              {/* <Route component={Other} path={getRoute('OTHER')} /> */}
              <Route component={Home}  path={getRoute('HOME')} exact />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </div>
  );
}

Main.propTypes = {
  onAuthFailure: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}
