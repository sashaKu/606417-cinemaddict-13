import {createElement} from "../utils.js";

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

export default class Movie {
  constructor(movie) {
    this._element = null;
    this.title = movie.title;
    this.rating = movie.rating;
    this.date = movie.date;
    this.runtime = movie.runtime;
    this.genre = movie.genre;
    this.poster = movie.poster;
    this.description = movie.description;
    this.comments = movie.comments;
    this.addToWatchlist = movie.addToWatchlist;
    this.alreadyWatched = movie.alreadyWatched;
    this.addTofavorites = movie.addTofavorites;
  }

  getTemplate() {

    return createMovieTemplate(this);
  }

  getElement() {

    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
