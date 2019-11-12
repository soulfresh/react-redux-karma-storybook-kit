// require root SCSS so our component styles match the app in real life.
import './index-test.scss';

// require all the test files in the test folder that end with Spec.js or Spec.jsx
const testsContext = require.context("./", true, /spec.jsx?$/i);
testsContext.keys().forEach(testsContext);
