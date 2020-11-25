import {createUserNameTemplate} from "./view/user-name.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createMainContentTemplate} from "./view/main-content.js";
import {createMovieTemplate} from "./view/movie.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createStatisticsTemplate} from "./view/statistics.js";
// Количество фильмов в главном списке
const MOVIE_COUNT = 5;
// Количество фильмов в списках "Top rated" и "Most commented"
const MOVIE_EXTRA_COUNT = 2;
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const siteHeaderElement = document.querySelector(`.header`);
// Звание пользователя
render(siteHeaderElement, createUserNameTemplate(), `beforeend`);
const siteMainElement = document.querySelector(`.main`);
// Меню
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
// Сортировка/фильтр
render(siteMainElement, createFilterTemplate(), `beforeend`);
// Контент
render(siteMainElement, createMainContentTemplate(), `beforeend`);
// Контейнер с заголовком и списком фильмов
const siteMoviesBoxElement = siteMainElement.querySelector(`.films-list`);
// Список фильмов
const siteMoviesListElement = siteMainElement.querySelector(`.films-list__container`);
for (let i = 0; i < MOVIE_COUNT; i++) {
  // Карточки фильмов для главного списка
  render(siteMoviesListElement, createMovieTemplate(), `beforeend`);
}
// Кнопка "Показать больше"
render(siteMoviesBoxElement, createShowMoreButtonTemplate(), `beforeend`);
// Контейнер с заголовком и списком "Top rated"
const siteTopRatedMoviesBoxElement = siteMainElement.querySelector(`.films-list.films-list--extra`);
// Список фильмов "Top rated"
const siteTopRatedMoviesListElement = siteTopRatedMoviesBoxElement.querySelector(`.films-list__container`);
for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
  // Карточки фильмов для списка "Top rated"
  render(siteTopRatedMoviesListElement, createMovieTemplate(), `beforeend`);
}
// Контейнер с заголовком и списком "Most commented"
const siteMostCommentedMoviesBoxElement = siteMainElement.querySelectorAll(`.films-list.films-list--extra`)[1];
// Список фильмов "Most commented"
const siteMostCommentedMoviesListElement = siteMostCommentedMoviesBoxElement.querySelector(`.films-list__container`);
for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
  // Карточки фильмов для списка "Most commented"
  render(siteMostCommentedMoviesListElement, createMovieTemplate(), `beforeend`);
}
const siteFooterElement = document.querySelector(`.footer`);
const siteStatisticsFooterElement = siteFooterElement.querySelector(`.footer__statistics`);
// Статистика в footer
render(siteStatisticsFooterElement, createStatisticsTemplate(), `beforeend`);

