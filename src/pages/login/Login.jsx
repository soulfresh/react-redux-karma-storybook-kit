import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classSet from 'react-classset';

import AuthAPI from '~/store/services/auth';

import './Login.scss';

export function Login({
  errorMessage,
  onSubmit,
}) {
  const handleSubmit = (values, {setErrors, setSubmitting}) => {
    onSubmit(values.username, values.password, setErrors, setSubmitting);
  };

  const errorClasses = classSet({
    'server-error': true,
    'visible': !!errorMessage,
  });

  return (
    <form className={errorClasses} data-test="loginForm">
      <input name="username" type="text" required data-test="username" />
      <input name="password" type="password" required data-test="password" />
      <button type="submit" onClick={handleSubmit} data-test="submit">Login</button>
    </form>
  );
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default function Connected(props) {
  const [failed, setFailed] = useState();

  const onSubmit = (username, password, setErrors, setSubmitting) => {
    // Call the AuthAPI directly (rather than dispatching
    // an action) because we don't want to require the full
    // store in the root App.
    AuthAPI.login(username, password)
      .then((response) => {
        setFailed(false);
        props.onSuccess();
      })
      .catch(error => {
        console.error('AUTH FAILURE', error.response);
        console.error(error);
        setFailed('Invalid Username or Password');
        setErrors({username: 'may be wrong', password: 'may be wrong'});
      });
  };

  return <Login {...props} errorMessage={failed} onSubmit={onSubmit} />;
}

Connected.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}

