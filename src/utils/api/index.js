const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('access-token');

export default class API {
  constructor(entity = '') {
    this.URL = `${API_URL}${entity ? '/' + entity : ''}`;
    this.token = token;
    this.tokenRefresh = token;
  }

  setNewToken = (data) => {
    this.token = data;
  };

  clearLocalStorage() {
    localStorage.removeItem('auth');
    localStorage.removeItem('access-token');
    return localStorage.removeItem('refresh-token');
  }

  get = (path = '', isAuth = false, queries = {}) => {
    const headers = {};
    if (isAuth) {
      headers['authorization'] = `Bearer ${token}`;
    }
    headers['Content-Type'] = 'application/json';
    return fetch(`${this.URL}/${path}`, {
      method: 'GET',
      headers,
      queries
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data === 'access token expired') {
          this.clearLocalStorage();
          document.location.reload(true);
        } else {
          return res;
        }
      });
  };
  getById = (path = '', isAuth = true, queries = '') => {
    const headers = {
      'Content-Type': 'application/json'
    };

    return fetch(`${this.URL}/${queries}`, {
      method: 'GET',
      headers
    }).then((res) => res.json());
  };

  post = (path = '', isAuth = false, body = {}) => {
    const headers = {};
    if (isAuth) {
      headers['authorization'] = `Bearer ${token}`;
    }
    headers['Content-Type'] = 'application/json';

    return fetch(`${this.URL}/${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    }).then((res) => res.json());
  };

  put = (path = '', isAuth = false, queries = '', body = {}) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    return fetch(`${this.URL}/${queries}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers
    }).then((res) => res.json());
  };

  getById = (path = '', isAuth = true, queries = '') => {
    const headers = {
      'Content-Type': 'application/json'
    };

    return fetch(`${this.URL}/${path}/${queries}`, {
      method: 'GET',
      headers
    }).then((res) => res.json());
  };

  delete = (path = '', isAuth = false, queries = '', body = {}) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    return fetch(`${this.URL}/${queries}/`, {
      method: 'DELETE',
      headers
    }).then((res) => res.json());
  };
}
