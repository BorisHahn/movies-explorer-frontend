class MovieApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  getMoviesFromBeatFilm() {
    return fetch(this._baseUrl, {
      method: 'GET',
    }).then((result) => this._getResponseData(result));
  }

  _getResponseData(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return result.json();
  }
}

const movieApi = new MovieApi({
  baseUrl: 'https://api.nomoreparties.co',
});

export default movieApi;
