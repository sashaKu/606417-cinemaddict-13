import SiteMenuView from "../view/site-menu.js";
import SortView from "../view/sort.js";
import MainContentView from "../view/main-content.js";
import MovieListView from "../view/movie-list.js";
import MovieListEmptyView from "../view/movie-list-empty.js";
import StatisticsView from "../view/statistics.js";
import MovieView from "../view/movie.js";
import MoreMoviesButtonView from "../view/show-more-button.js";
import MovieModalView from "../view/movie-modal.js";
import CommentView from "../view/write-comment.js";
import {render, RenderPosition} from "../utils/render.js";

const MOVIES_STEP = 5;

export default class MainPresenter {
  constructor(bodyContainer, mainContainer) {
    this._bodyContainer = bodyContainer;
    this._mainContainer = mainContainer;
    this._renderedMoviesStep = MOVIES_STEP;

    this._mainContentComponent = new MainContentView();
    this._movieListComponent = new MovieListView();
    this._movieListEmptyComponent = new MovieListEmptyView();
    this._moreMoviesButtonComponent = new MoreMoviesButtonView();

    this._handleMoreMoviesButtonClick = this._handleMoreMoviesButtonClick.bind(this);

    this._handleOpenCardClick = this._handleOpenCardClick.bind(this);
    this._handleCloseCardClick = this._handleCloseCardClick.bind(this);
    this._handleCloseCardescKeyDown = this._handleCloseCardescKeyDown.bind(this);
  }

  init(sort, comment, movies, filter, user) {
    this._sort = sort;
    this._comment = comment;
    this._movies = movies.slice();
    this._filter = filter;
    this._user = user;

    this._renderSetContent();
  }

  _renderFilter() {
    this._siteMenuComponent = new SiteMenuView(this._filter);
    render(this._mainContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    this._sortComponent = new SortView(this._sort);
    render(this._mainContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderStatistics() {
    this._statisticsComponent = new StatisticsView(this._user);
    render(this._mainContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
  }

  _renderMovieList() {

    render(this._siteMoviesBoxElement, this._movieListComponent, RenderPosition.BEFOREEND);
    // Список фильмов
    this._moviesListContainer = this._siteMoviesBoxElement.querySelector(`.films-list__container`);

    for (let i = 0; i < Math.min(this._movies.length, MOVIES_STEP); i++) {
      this._renderMovieCard(this._moviesListContainer, this._movies[i]);
    }

    if (this._movies.length > MOVIES_STEP) {
      // Кнопка "Показать больше"
      this._renderMoreMoviesButton();
    }
  }

  _renderMovieListEmpty() {
    // Заголовок, когда фильмов нет
    render(this._siteMoviesBoxElement, this._movieListEmptyComponent, RenderPosition.BEFOREEND);
  }

  _handleMoreMoviesButtonClick() {
    this._movies
      .slice(this._renderedMoviesStep, this._renderedMoviesStep + MOVIES_STEP)
      .forEach((movie) => this._renderMovieCard(this._moviesListContainer, movie));

    this._renderedMoviesStep += MOVIES_STEP;

    if (this._renderedMoviesStep >= this._movies.length) {
      this._moreMoviesButtonComponent.getElement().remove();
    }
  }

  _renderMoreMoviesButton() {
    // Кнопка "Показать больше"
    render(this._siteMoviesBoxElement, this._moreMoviesButtonComponent, RenderPosition.BEFOREEND);

    this._moreMoviesButtonComponent.setClickHandler(this._handleMoreMoviesButtonClick);
  }

  _renderMovieCard(moviesContainer, movie) {
    // popap с детальной информацией по фильму
    this._movieCard = new MovieView(movie);
    this._movieModal = new MovieModalView(movie);
    this._writeComment = new CommentView(this._comment);

    this._movieModal.setClickHandler(this._handleCloseCardClick);

    this._movieCard.setClickHandler(this._handleOpenCardClick);

    render(moviesContainer, this._movieCard, RenderPosition.BEFOREEND);
  }

  _closeMovieCard() {
  // Сценарий - закрытие модального окна
    this._bodyContainer.querySelector(`.film-details__comments-wrap`).removeChild(this._writeComment.getElement());
    this._bodyContainer.removeChild(this._movieModal.getElement());
    this._bodyContainer.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._handleCloseCardescKeyDown);
  }

  _handleCloseCardescKeyDown(evt) {
  // Событие по ESC
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeMovieCard();
    }
  }

  _handleCloseCardClick() {
    this._closeMovieCard();
  }

  _handleOpenCardClick() {
    document.addEventListener(`keydown`, this._handleCloseCardescKeyDown);
    this._bodyContainer.appendChild(this._movieModal.getElement());
    this._bodyContainer.classList.add(`hide-overflow`);
    // Написать комментарии к фильму
    this._bodyContainer.querySelector(`.film-details__comments-wrap`).appendChild(this._writeComment.getElement());
  }

  _renderSetContent() {
    this._renderFilter();
    this._renderStatistics();
    this._renderSort();

    render(this._mainContainer, this._mainContentComponent, RenderPosition.BEFOREEND);

    this._siteMoviesBoxElement = this._mainContainer.querySelector(`.films`);

    if (this._movies.every((movie) => movie.isArchive)) {
      // Заголовок, когда фильмов нет
      this._renderMovieListEmpty();
    } else {
      // Контейнер с заголовком и списком фильмов
      this._renderMovieList();
    }
  }
}

