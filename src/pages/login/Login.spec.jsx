import React from 'react';

import { Login } from './Login.jsx';
import LoginPageObject from './Login.page-object';

describe('Login', function() {
  let page, onSubmit;

  beforeEach(function() {
    page = new LoginPageObject();
  });

  afterEach(function() {
    page.destroySandbox();
  });

  beforeEach(function() {
    onSubmit = jasmine.createSpy('onSubmit');
    page.render(
      <Login onSubmit={onSubmit} />
    );
  });

  describe('after submitting without any data', function() {
    beforeEach(function(done) {
      page.submit();
      setTimeout(done);
    });

    xit('should show an error for the username.', () => { });
    xit('should show an error for the password.', () => { });
  });

  describe('after submitting with valid data', function() {
    beforeEach(function(done) {
      page.username.value = 'Batman';
      page.password.value = 'Joker Sucks';
      page.submit();
      setTimeout(done);
    });

    xit('should not show any errors', () => { });
    xit('should call on submit.', () => { });

    describe('after the server returns an error', function() {
      xit('should show the error to the user.');
    });

    describe('after a success response from the server', function() {
      xit('should take call the login components onSuccess callback.');
    });
  });
});
