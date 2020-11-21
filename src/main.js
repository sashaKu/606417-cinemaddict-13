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

const siteMoviesElements = Array.from(siteMainElement.querySelectorAll(`.films-list`));
siteMoviesElements.forEach(item => {
  const siteMoviesContainerElements = Array.from(item.querySelectorAll(`.films-list__container`));
  if (!item.classList.contains('films-list--extra')) {
    siteMoviesContainerElements.forEach(item => {
      for (let i = 0; i < MOVIE_COUNT; i++) {
        // Карточки фильмов для главного списка
        render(item, createMovieTemplate(), `beforeend`);
      }
    });
    // Кнопка "Показать больше"
    render(item, createShowMoreButtonTemplate(), `beforeend`);
  }
  else {
      siteMoviesContainerElements.forEach(item => {
        for (let i = 0; i < MOVIE_EXTRA_COUNT; i++) {
          // Карточки фильмов для списков "Top rated" и "Most commented"
          render(item, createMovieTemplate(), `beforeend`);
        }
    });
  }
});

const siteFooterElement = document.querySelector(`.footer`);
const siteStatisticsFooterElement = siteFooterElement.querySelector(`.footer__statistics`);
// Статистика в footer
render(siteStatisticsFooterElement, createStatisticsTemplate(), `beforeend`);

