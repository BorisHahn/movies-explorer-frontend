class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._isCredantials = options.credentials;
  }

  getProfileInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers,
      credentials: this._isCredantials,
    }).then((result) => this._getResponseData(result));
  }

  signUp({ name, email, password }) {
    return fetch(this._baseUrl + '/signup', {
      body: JSON.stringify({ name, email, password }),
      method: 'POST',
      headers: this._headers,
      credentials: this._isCredantials,
    }).then((result) => this._getResponseData(result));
  }

  signIn({ email, password }) {
    return fetch(this._baseUrl + '/signin', {
      body: JSON.stringify({ email, password }),
      method: 'POST',
      headers: this._headers,
      credentials: this._isCredantials,
    }).then((result) => this._getResponseData(result));
  }

  signOut() {
    return fetch(this._baseUrl + '/signout', {
      method: 'POST',
      headers: this._headers,
      credentials: this._isCredantials,
    });
  }

  editProfileInfo({ name, email }) {
    return fetch(this._baseUrl + '/users/me', {
      body: JSON.stringify({ name, email }),
      method: 'PATCH',
      headers: this._headers,
      credentials: this._isCredantials,
    }).then((result) => this._getResponseData(result));
  }

  getSavedMoviesByUser() {
    return fetch(this._baseUrl + '/movies', {
      method: 'GET',
      headers: this._headers,
      credentials: this._isCredantials,
    }).then((result) => this._getResponseData(result));
  }

  addMovieToSavedMovies(data) {
    return fetch(this._baseUrl + '/movies', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: this._headers,
      credentials: this._isCredantials,
    }).then((result) => this._getResponseData(result));
  }

  deleteMovieFromSavedMovies(id) {
    return fetch(this._baseUrl + `/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: this._isCredantials,
    }).then((result) => this._getResponseData(result));
  }

  _getResponseData(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return result.json();
  }
}

const mainApi = new MainApi({
  baseUrl: 'api.gaidukevich.movie.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default mainApi;
