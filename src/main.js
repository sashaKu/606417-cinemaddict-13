import {createUserTemplate} from "./view/user.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createMainContentTemplate} from "./view/main-content.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createMovieTemplate} from "./view/movie.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createStatisticsFooterTemplate} from "./view/statistics-footer.js";
import {createMovieModalTemplate} from "./view/movie-modal.js";
import {createWriteCommentTemplate} from "./view/write-comment.js";
import {generateUser} from "./mock/user.js";
import {generateFilter} from "./mock/filter.js";
import {generateSort} from "./mock/sort.js";
import {generateMovieList} from "./mock/movie.js";
import {generateComment} from "./mock/comment.js";
import {generateStatisticFooter} from "./mock/statistic-footer.js";
import {renderTemplate} from "../utils.js";

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
renderTemplate(siteHeaderElement, createUserTemplate(user), `beforeend`);

const siteMainElement = siteBodyElement.querySelector(`.main`);

// Меню /Фильтр
renderTemplate(siteMainElement, createSiteMenuTemplate(filter), `beforeend`);
// Статистика
renderTemplate(siteMainElement, createStatisticsTemplate(user), `beforeend`);
// Сортировка
renderTemplate(siteMainElement, createSortTemplate(sort), `beforeend`);
// Контент
renderTemplate(siteMainElement, createMainContentTemplate(), `beforeend`);
// Контейнер с заголовком и списком фильмов

const siteMoviesBoxElement = siteMainElement.querySelector(`.films-list`);
// Список фильмов
const siteMoviesListElement = siteMainElement.querySelector(`.films-list__container`);

const MOVIES_STEP = 5;

renderTemplate(siteMoviesListElement, createMovieTemplate(movies[0]), `beforeend`);

for (let i = 1; i < Math.min(movies.length, MOVIES_STEP); i++) {
  renderTemplate(siteMoviesListElement, createMovieTemplate(movies[i]), `beforeend`);
}

if (movies.length > MOVIES_STEP) {
  let renderTemplateedMovieCount = MOVIES_STEP;

  // Кнопка "Показать больше"
  renderTemplate(siteMoviesBoxElement, createShowMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = siteMoviesBoxElement.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    movies
      .slice(renderTemplateedMovieCount, renderTemplateedMovieCount + MOVIES_STEP)
      .forEach((movies) => renderTemplate(siteMoviesListElement, createMovieTemplate(movies), `beforeend`));

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
  renderTemplate(siteTopRatedMoviesListElement, createMovieTemplate(movies[i]), `beforeend`);
}

// Контейнер с заголовком и списком "Most commented"

const siteMostCommentedMoviesBoxElement = siteMainElement.querySelectorAll(`.films-list.films-list--extra`)[1];
// Список фильмов "Most commented"
const siteMostCommentedMoviesListElement = siteMostCommentedMoviesBoxElement.querySelector(`.films-list__container`);

for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
  // Карточки фильмов для списка "Most commented"
  renderTemplate(siteMostCommentedMoviesListElement, createMovieTemplate(movies[i]), `beforeend`);
}

// popap с детальной информацией по фильму
renderTemplate(siteBodyElement, createMovieModalTemplate(movies[1]), `beforeend`);

// Написать комментарии к фильму
const siteWriteCommentElement = siteBodyElement.querySelector(`.film-details__new-comment`);
renderTemplate(siteWriteCommentElement, createWriteCommentTemplate(comment), `beforeend`);

// Статистика в footer
const siteFooterElement = document.querySelector(`.footer`);
const siteStatisticsFooterElement = siteFooterElement.querySelector(`.footer__statistics`);
renderTemplate(siteStatisticsFooterElement, createStatisticsFooterTemplate(statisticsFooter), `beforeend`);
