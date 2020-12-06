import User from "./view/user.js";
import SiteMenu from "./view/site-menu.js";
import Sort from "./view/sort.js";
import MainContent from "./view/main-content.js";
import Statistics from "./view/statistics.js";
import Movie from "./view/movie.js";
import ShowMoreButton from "./view/show-more-button.js";
import StatisticsFooter from "./view/statistics-footer.js";
import MovieModal from "./view/movie-modal.js";
import WriteComment from "./view/write-comment.js";
import {generateUser} from "./mock/user.js";
import {generateFilter} from "./mock/filter.js";
import {generateSort} from "./mock/sort.js";
import {generateMovieList} from "./mock/movie.js";
import {generateComment} from "./mock/comment.js";
import {generateStatisticFooter} from "./mock/statistic-footer.js";
import {renderElement, RenderPosition} from "./utils.js";

const user = generateUser();
const sort = generateSort();
const comment = generateComment();
// Количество фильмов в главном списке
const movies = generateMovieList();
const filter = generateFilter(movies);
// Количество фильмов в списках "Top rated" и "Most commented"
const MOVIE_EXTRA_COUNT = 2;
const statisticsFooter = generateStatisticFooter();

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);

// Звание пользователя
renderElement(siteHeaderElement, new User(user).getElement(), RenderPosition.BEFOREEND);

const siteMainElement = siteBodyElement.querySelector(`.main`);

// Меню /Фильтр
renderElement(siteMainElement, new SiteMenu(filter).getElement(), RenderPosition.BEFOREEND);
// Статистика
renderElement(siteMainElement, new Statistics(user).getElement(), RenderPosition.BEFOREEND);
// Сортировка
renderElement(siteMainElement, new Sort(sort).getElement(), RenderPosition.BEFOREEND);
// Контент
renderElement(siteMainElement, new MainContent().getElement(), RenderPosition.BEFOREEND);
// Контейнер с заголовком и списком фильмов

const siteMoviesBoxElement = siteMainElement.querySelector(`.films-list`);
// Список фильмов
const siteMoviesListElement = siteMainElement.querySelector(`.films-list__container`);

const MOVIES_STEP = 5;

for (let i = 1; i < Math.min(movies.length, MOVIES_STEP); i++) {
  renderElement(siteMoviesListElement, new Movie(movies[i]).getElement(), RenderPosition.BEFOREEND);
}

if (movies.length > MOVIES_STEP) {
  let renderTemplateedMovieCount = MOVIES_STEP;

  // Кнопка "Показать больше"
  renderElement(siteMoviesBoxElement, new ShowMoreButton().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = siteMoviesBoxElement.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    movies
      .slice(renderTemplateedMovieCount, renderTemplateedMovieCount + MOVIES_STEP)
      .forEach((movie) => renderElement(siteMoviesListElement, new Movie(movie).getElement(), RenderPosition.BEFOREEND));

    renderTemplateedMovieCount += MOVIES_STEP;

    if (renderTemplateedMovieCount >= movies.length) {
      loadMoreButton.remove();
    }
  });
}

// Контейнер с заголовком и списком "Top rated"

const siteTopRatedMoviesBoxElement = siteMainElement.querySelector(`.films-list.films-list--extra`);
// Список фильмов "Top rated"
const siteTopRatedMoviesListElement = siteTopRatedMoviesBoxElement.querySelector(`.films-list__container`);

for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
  // Карточки фильмов для списка "Top rated"
  renderElement(siteTopRatedMoviesListElement, new Movie(movies[i]).getElement(), RenderPosition.BEFOREEND);
}

// Контейнер с заголовком и списком "Most commented"

const siteMostCommentedMoviesBoxElement = siteMainElement.querySelectorAll(`.films-list.films-list--extra`)[1];
// Список фильмов "Most commented"
const siteMostCommentedMoviesListElement = siteMostCommentedMoviesBoxElement.querySelector(`.films-list__container`);

for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
  // Карточки фильмов для списка "Most commented"
  renderElement(siteMostCommentedMoviesListElement, new Movie(movies[i]).getElement(), RenderPosition.BEFOREEND);
}

// popap с детальной информацией по фильму
renderElement(siteBodyElement, new MovieModal(movies[1]).getElement(), RenderPosition.BEFOREEND);

// Написать комментарии к фильму
const siteWriteCommentElement = siteBodyElement.querySelector(`.film-details__new-comment`);
renderElement(siteWriteCommentElement, new WriteComment(comment).getElement(), RenderPosition.BEFOREEND);

// Статистика в footer
const siteFooterElement = document.querySelector(`.footer`);
const siteStatisticsFooterElement = siteFooterElement.querySelector(`.footer__statistics`);
renderElement(siteStatisticsFooterElement, new StatisticsFooter(statisticsFooter).getElement(), RenderPosition.BEFOREEND);
