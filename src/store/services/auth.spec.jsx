import MockAdapter from 'axios-mock-adapter';
import { localStorage } from 'global';

import AuthAPI, {
  AUTH_TOKEN_KEY
} from './auth.js';

describe('auth', function() {
  let auth, onFailure;
  const email = 'foo@bar.baz';
  const password = 'sup3rs3cr3t';
  const token = 'abc123';

  beforeEach(function() {
    auth = new MockAdapter(AuthAPI.axe);
  });

  beforeEach(function() {
    onFailure = jasmine.createSpy('onFailure');
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'removeItem');
  });

  describe('when logging in unsuccessfully', function() {
    beforeEach(function(done) {
      auth.onPost('/login').reply(500);
      AuthAPI.login(email, password)
        .then(done)
        .catch(() => {
          onFailure();
          done();
        })
    });

    it('should not try to save save the users auth token.', () => {
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should pass the error to the caller.', () => {
      expect(onFailure).toHaveBeenCalledTimes(1);
    });

    it('should be able to tell if the user is logged in', () => {
      expect(AuthAPI.isLoggedIn).toBe(false);
      expect(AuthAPI.getToken()).toEqual(undefined);
    })
  });

  describe('when logging in successfully', function() {
    beforeEach(function(done) {
      localStorage.getItem.and.returnValue(token);
      auth.onPost('/login').reply(200, {token});
      AuthAPI.login(email, password).then(done);
    });

    it('should call the backend service.', () => {
      expect(auth.history.post.length).toEqual(1);

      const data = JSON.parse(auth.history.post[0].data);
      expect(data).toEqual({user: {email, password}});
    });

    it('should save the users auth token.', () => {
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(AUTH_TOKEN_KEY, token);
    });

    it('should be able to tell if the user is logged in', () => {
      expect(AuthAPI.isLoggedIn).toBe(true);
      expect(AuthAPI.getToken()).toEqual(token);
    });

    describe('and then logging out', function() {
      beforeEach(function() {
        AuthAPI.logout();
      });

      it('should delete the users auth token.', () => {
        expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
        expect(localStorage.removeItem).toHaveBeenCalledWith(AUTH_TOKEN_KEY);
      });
    });
  });
});
