import axios from 'axios';
import { localStorage } from 'global';

const AUTH_TOKEN_KEY = 'authToken';

class AuthAPI {
  constructor() {
    this.axe = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'content-type': 'application/json',
      }
    });
  }

  login(username, password) {
    return this.axe.post('/login', {user: {email: username, password}})
      .then((response) => {
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
      });
  }

  logout() {
    this.clearToken();
  }

  get isLoggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  clearToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

export default new AuthAPI();

