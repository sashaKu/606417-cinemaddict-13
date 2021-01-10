import AbstractView from "./abstract.js";

const createMovieTemplate = (movie) => {

  const {title, rating, date, runtime, genre, poster, description, comments, addToWatchlist, alreadyWatched, addTofavorites} = movie;

  const lessDescription = description.length > 140
    ? description.substring(0, 139) + `...`
    : description;

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${date}</span>
    <span class="film-card__duration">${runtime}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="./images/posters/${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${lessDescription}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${addToWatchlist ? ` film-card__controls-item--active` : ``}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${alreadyWatched ? ` film-card__controls-item--active` : ``}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite${addTofavorites ? ` film-card__controls-item--active` : ``}" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class MovieView extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;

    this._clickHandler = this._clickHandler.bind(this);
    this._clickHandlerControlAddToWatchList = this._clickHandlerControlAddToWatchList.bind(this);
    this._clickHandlerControlMarkAsWatched = this._clickHandlerControlMarkAsWatched.bind(this);
    this._clickHandlerControlAddToFavorite = this._clickHandlerControlAddToFavorite.bind(this);
  }

  getTemplate() {

    return createMovieTemplate(this._movie);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click();
  }

  _clickHandlerControlAddToWatchList(evt) {
    evt.preventDefault();

    this._callback.clickAddToWatchList();
  }

  _clickHandlerControlMarkAsWatched(evt) {
    evt.preventDefault();

    this._callback.clickMarkAsWatched();
  }

  _clickHandlerControlAddToFavorite(evt) {
    evt.preventDefault();

    this._callback.clickAddToFavorite();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
  }

  setClickControlAddToWatchList(callback) {
    this._callback.clickAddToWatchList = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._clickHandlerControlAddToWatchList);
  }

  setClickControlMarkAsWatched(callback) {
    this._callback.clickMarkAsWatched = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._clickHandlerControlMarkAsWatched);
  }

  setClickControlAddToFavorite(callback) {
    this._callback.clickAddToFavorite = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._clickHandlerControlAddToFavorite);
  }
}
