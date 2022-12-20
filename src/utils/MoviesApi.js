class MovieApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  getMoviesFromBeatFilm() {
    return fetch(this._baseUrl + '/beatfilm-movies').then((result) =>
      this._getResponseData(result)
    );
  }

  _getResponseData(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return result.json().then((res) => this._createNewArray(res));
  }

  _createNewArray(res) {
    return res.map((item) => ({
      country: item.country,
      director: item.director,
      duration: item.duration,
      year: item.year,
      description: item.description,
      image: this._baseUrl + item.image.url,
      trailerLink: item.trailerLink,
      thumbnail: this._baseUrl + item.image.url,
      movieId: item.id,
      nameRU: item.nameRU,
      nameEN: item.nameEN,
    }));
  }
}

const movieApi = new MovieApi({
  baseUrl: 'https://api.nomoreparties.co',
});

export default movieApi;
