import UserView from "./view/user.js";
import SiteMenuView from "./view/site-menu.js";
import SortView from "./view/sort.js";
import MainContentView from "./view/main-content.js";
import MovieListView from "./view/movie-list.js";
import MovieListEmptyView from "./view/movie-list-empty.js";
import StatisticsView from "./view/statistics.js";
import MovieView from "./view/movie.js";
import MoreMoviesButtonView from "./view/show-more-button.js";
import StatisticsFooterView from "./view/statistics-footer.js";
import MovieModalView from "./view/movie-modal.js";
import CommentView from "./view/write-comment.js";
import {generateUser} from "./mock/user.js";
import {generateFilter} from "./mock/filter.js";
import {generateSort} from "./mock/sort.js";
import {generateMovieList} from "./mock/movie.js";
import {generateComment} from "./mock/comment.js";
import {generateStatisticFooter} from "./mock/statistic-footer.js";
import {render, RenderPosition} from "./utils/render.js";

const user = generateUser();
const sort = generateSort();
const comment = generateComment();
// Количество фильмов в главном списке
const movies = generateMovieList();
const filter = generateFilter(movies);
const statisticsFooter = generateStatisticFooter();

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);

// Звание пользователя
render(siteHeaderElement, new UserView(user), RenderPosition.BEFOREEND);

const siteMainElement = siteBodyElement.querySelector(`.main`);

// Меню /Фильтр
render(siteMainElement, new SiteMenuView(filter), RenderPosition.BEFOREEND);
// Статистика
render(siteMainElement, new StatisticsView(user), RenderPosition.BEFOREEND);
// Сортировка
render(siteMainElement, new SortView(sort), RenderPosition.BEFOREEND);
// Контент
render(siteMainElement, new MainContentView(), RenderPosition.BEFOREEND);

const siteMoviesBoxElement = siteMainElement.querySelector(`.films`);

if (movies.every((movie) => movie.isArchive)) {
  // Заголовок, когда фильмов нет
  render(siteMoviesBoxElement, new MovieListEmptyView(), RenderPosition.BEFOREEND);
} else {
  // Контейнер с заголовком и списком фильмов
  render(siteMoviesBoxElement, new MovieListView(), RenderPosition.BEFOREEND);

  // Список фильмов
  const moviesListContainer = siteMoviesBoxElement.querySelector(`.films-list__container`);

  const MOVIES_STEP = 5;

  // popap с детальной информацией по фильму
  const renderMovieCard = (moviesContainer, movie) => {
    const movieCard = new MovieView(movie);
    const movieModal = new MovieModalView(movie);
    const writeComment = new CommentView(comment);

    // Функция для события, сценарий - закрытие модального окна
    const removeAction = () => {
      siteBodyElement.querySelector(`.film-details__comments-wrap`).removeChild(writeComment.getElement());
      siteBodyElement.removeChild(movieModal.getElement());
      siteBodyElement.classList.remove(`hide-overflow`);
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
      siteBodyElement.appendChild(movieModal.getElement());
      siteBodyElement.classList.add(`hide-overflow`);
      // Написать комментарии к фильму
      siteBodyElement.querySelector(`.film-details__comments-wrap`).appendChild(writeComment.getElement());
    });

    render(moviesContainer, movieCard, RenderPosition.BEFOREEND);
  };

  for (let i = 0; i < Math.min(movies.length, MOVIES_STEP); i++) {
    renderMovieCard(moviesListContainer, movies[i]);
  }

  if (movies.length > MOVIES_STEP) {
    let renderTemplateedMovieCount = MOVIES_STEP;

    // Кнопка "Показать больше"
    const loadMoreButton = new MoreMoviesButtonView();

    render(siteMoviesBoxElement, loadMoreButton, RenderPosition.BEFOREEND);

    loadMoreButton.setClickHandler(() => {

      movies
        .slice(renderTemplateedMovieCount, renderTemplateedMovieCount + MOVIES_STEP)
        .forEach((movie) => renderMovieCard(moviesListContainer, movie));

      renderTemplateedMovieCount += MOVIES_STEP;

      if (renderTemplateedMovieCount >= movies.length) {
        loadMoreButton.getElement().remove();
      }
    });
  }
}

// Статистика в footer
const siteFooterElement = document.querySelector(`.footer`);
const siteStatisticsFooterElement = siteFooterElement.querySelector(`.footer__statistics`);
render(siteStatisticsFooterElement, new StatisticsFooterView(statisticsFooter), RenderPosition.BEFOREEND);
