import {createUserTemplate} from "./view/user.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createMainContentTemplate} from "./view/main-content.js";
import {createStatisticsTemplate} from "./view/statistics.js";
import {createMovieTemplate} from "./view/movie.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createStatisticsFooterTemplate} from "./view/statistics-footer.js";
import {createMovieModalTemplate} from "./view/movie-modal.js";
import {createCommentTemplate} from "./view/comment.js";
import {createWriteCommentTemplate} from "./view/write-comment.js";
import {generateUser} from "./mock/user.js";
import {generateFilter} from "./mock/filter.js";
import {generateSort} from "./mock/sort.js";
import {generateMovie} from "./mock/movie.js";
import {generateComment} from "./mock/comment.js";
import {generateStatisticFooter} from "./mock/statistic-footer.js";
const user = generateUser();
const filter = generateFilter();
const sort = generateSort();
// Количество фильмов в главном списке
const MOVIE_COUNT = generateFilter().item.count;
const movie = new Array(MOVIE_COUNT).fill().map(generateMovie);
// Количество фильмов в списках "Top rated" и "Most commented"
const MOVIE_EXTRA_COUNT = 2;
const comment = generateComment();
const statisticsFooter = generateStatisticFooter();
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
// Звание пользователя
render(siteHeaderElement, createUserTemplate(user), `beforeend`);
const siteMainElement = siteBodyElement.querySelector(`.main`);
// Меню /Фильтр
render(siteMainElement, createSiteMenuTemplate(filter), `beforeend`);
// Статистика
render(siteMainElement, createStatisticsTemplate(user), `beforeend`);
// Сортировка
render(siteMainElement, createSortTemplate(sort), `beforeend`);
// Контент
render(siteMainElement, createMainContentTemplate(), `beforeend`);
// Контейнер с заголовком и списком фильмов
const siteMoviesBoxElement = siteMainElement.querySelector(`.films-list`);
// Список фильмов
const siteMoviesListElement = siteMainElement.querySelector(`.films-list__container`);
for (let i = 0; i < MOVIE_COUNT; i++) {
  // Карточки фильмов для главного списка
  render(siteMoviesListElement, createMovieTemplate(movie[i]), `beforeend`);
}
// Кнопка "Показать больше"
render(siteMoviesBoxElement, createShowMoreButtonTemplate(), `beforeend`);
// Контейнер с заголовком и списком "Top rated"
const siteTopRatedMoviesBoxElement = siteMainElement.querySelector(`.films-list.films-list--extra`);
// Список фильмов "Top rated"
const siteTopRatedMoviesListElement = siteTopRatedMoviesBoxElement.querySelector(`.films-list__container`);
for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
  // Карточки фильмов для списка "Top rated"
  render(siteTopRatedMoviesListElement, createMovieTemplate(movie[i]), `beforeend`);
}
// Контейнер с заголовком и списком "Most commented"
const siteMostCommentedMoviesBoxElement = siteMainElement.querySelectorAll(`.films-list.films-list--extra`)[1];
// Список фильмов "Most commented"
const siteMostCommentedMoviesListElement = siteMostCommentedMoviesBoxElement.querySelector(`.films-list__container`);
for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
  // Карточки фильмов для списка "Most commented"
  render(siteMostCommentedMoviesListElement, createMovieTemplate(movie[i]), `beforeend`);
}
const siteFooterElement = document.querySelector(`.footer`);
const siteStatisticsFooterElement = siteFooterElement.querySelector(`.footer__statistics`);
// Статистика в footer
render(siteStatisticsFooterElement, createStatisticsFooterTemplate(statisticsFooter), `beforeend`);
// popap с детальной информацией по фильму
render(siteBodyElement, createMovieModalTemplate(movie[1]), `beforeend`);
// комментарии по фильму
const siteCommentElement = siteBodyElement.querySelector(`.film-details__comments-list`);
render(siteCommentElement, createCommentTemplate(comment), `beforeend`);
// Написать комментарии к фильму
const siteWriteCommentElement = siteBodyElement.querySelector(`.film-details__new-comment`);
render(siteWriteCommentElement, createWriteCommentTemplate(comment), `beforeend`);
