class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._isCredantials = options.credentials;
  }

  signUp({ name, email, password }) {
    const config = Object.assign(
      {
        body: JSON.stringify({ name, email, password }),
        method: 'POST',
        headers: this._headers,
      },
    );
    return fetch(this._baseUrl + '/signup', config).then((result) =>
      this._getResponseData(result)
    );
  }

  _getResponseData(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return res.json();
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
