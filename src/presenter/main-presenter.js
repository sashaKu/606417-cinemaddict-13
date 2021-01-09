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

    this._mainContentComponent = new MainContentView();
    this._movieListComponent = new MovieListView();
    this._movieListEmptyComponent = new MovieListEmptyView();
    this._moreMoviesButtonComponent = new MoreMoviesButtonView();
    this._commentComponent = new CommentView(this._comment);
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
    if (this._movies.every((movie) => movie.isArchive)) {
      // Заголовок, когда фильмов нет
      this._renderMovieListEmpty();
    } else {
      // Контейнер с заголовком и списком фильмов
      render(this._siteMoviesBoxElement, this._movieListComponent, RenderPosition.BEFOREEND);

      // Список фильмов
      const moviesListContainer = this._siteMoviesBoxElement.querySelector(`.films-list__container`);

      // popap с детальной информацией по фильму
      const renderMovieCard = (moviesContainer, movie) => {
        const movieCard = new MovieView(movie);
        const movieModal = new MovieModalView(movie);
        const writeComment = new CommentView(this._comment);

        // Функция для события, сценарий - закрытие модального окна
        const removeAction = () => {
          this._bodyContainer.querySelector(`.film-details__comments-wrap`).removeChild(writeComment.getElement());
          this._bodyContainer.removeChild(movieModal.getElement());
          this._bodyContainer.classList.remove(`hide-overflow`);
          document.removeEventListener(`keydown`, onEscKeyDown);
        };
        // Событие по ESC
        const onEscKeyDown = (evt) => {
          if (evt.key === `Escape` || evt.key === `Esc`) {
            evt.preventDefault();
            removeAction();
          }
        };

        movieModal.setClickHandler(() => {
          removeAction();
        });
        movieCard.setClickHandler(() => {
          document.addEventListener(`keydown`, onEscKeyDown);
          this._bodyContainer.appendChild(movieModal.getElement());
          this._bodyContainer.classList.add(`hide-overflow`);
          // Написать комментарии к фильму
          this._bodyContainer.querySelector(`.film-details__comments-wrap`).appendChild(writeComment.getElement());
        });

        render(moviesContainer, movieCard, RenderPosition.BEFOREEND);
      };

      for (let i = 0; i < Math.min(this._movies.length, MOVIES_STEP); i++) {
        renderMovieCard(moviesListContainer, this._movies[i]);
      }

      if (this._movies.length > MOVIES_STEP) {
        let renderTemplateedMovieCount = MOVIES_STEP;

        // Кнопка "Показать больше"
        render(this._siteMoviesBoxElement, this._moreMoviesButtonComponent, RenderPosition.BEFOREEND);

        this._moreMoviesButtonComponent.setClickHandler(() => {

          this._movies
            .slice(renderTemplateedMovieCount, renderTemplateedMovieCount + MOVIES_STEP)
            .forEach((movie) => renderMovieCard(moviesListContainer, movie));

          renderTemplateedMovieCount += MOVIES_STEP;

          if (renderTemplateedMovieCount >= this._movies.length) {
            this._moreMoviesButtonComponent.getElement().remove();
          }
        });
      }
    }
  }

  _renderMovieListEmpty() {

    render(this._siteMoviesBoxElement, this._movieListEmptyComponent, RenderPosition.BEFOREEND);
  }

  _renderSetContent() {
    this._renderFilter();
    this._renderStatistics();
    this._renderSort();

    render(this._mainContainer, this._mainContentComponent, RenderPosition.BEFOREEND);

    this._siteMoviesBoxElement = this._mainContainer.querySelector(`.films`);

    this._renderMovieList();
  }
}

