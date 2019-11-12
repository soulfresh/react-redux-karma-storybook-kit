import React, { Suspense, lazy, useState } from 'react';

import { PageLoader, LoaderService } from './components';
import { BundleLoadError } from './pages/bundle-load-error';
import { Login } from './pages/login';
import AuthAPI from './store/services/auth';
import defaultHistory from './store/history';

import './App.scss';

// Create two separate bundles so the login page can
// load as quickly as possible.
const Home = lazy(() => import('./pages/home/Home.jsx'));

export default function App({
  history
}) {
  history = history || defaultHistory;
  const token = AuthAPI.getToken();

  const [authenticated, setAuthenticated] = useState(!!token);

  const onAuthSuccess = () => setAuthenticated(true);
  const onAuthFailure = () => setAuthenticated(false);

  const view = authenticated
    ? <Home onAuthFailure={onAuthFailure} history={history} />
    : <Login onSuccess={onAuthSuccess} />;

  LoaderService.stop();

  return (
    <div className="App">
      <BundleLoadError>
        <Suspense fallback={<PageLoader />}>
          { view }
        </Suspense>
      </BundleLoadError>
    </div>
  );
}
