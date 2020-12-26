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
const moviesListContainer = siteMainElement.querySelector(`.films-list__container`);

const MOVIES_STEP = 5;

// popap с детальной информацией по фильму
const renderMovieCard = (moviesContainer, movie) => {
  const movieCard = new Movie(movie);
  const movieModal = new MovieModal(movie);

  movieModal.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    siteBodyElement.removeChild(movieModal.getElement());
    siteBodyElement.classList.remove(`hide-overflow`);
  });

  movieCard.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    siteBodyElement.appendChild(movieModal.getElement());
    siteBodyElement.classList.add(`hide-overflow`);
    // Написать комментарии к фильму
    const siteWriteCommentElement = siteBodyElement.querySelector(`.film-details__new-comment`);
    renderElement(siteWriteCommentElement, new WriteComment(comment).getElement(), RenderPosition.BEFOREEND);
  });

  renderElement(moviesContainer, movieCard.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i < Math.min(movies.length, MOVIES_STEP); i++) {
  renderMovieCard(moviesListContainer, movies[i]);
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
      .forEach((movie) => renderMovieCard(moviesListContainer, movie));

    renderTemplateedMovieCount += MOVIES_STEP;

    if (renderTemplateedMovieCount >= movies.length) {
      loadMoreButton.remove();
    }
  });
}

// Статистика в footer
const siteFooterElement = document.querySelector(`.footer`);
const siteStatisticsFooterElement = siteFooterElement.querySelector(`.footer__statistics`);
renderElement(siteStatisticsFooterElement, new StatisticsFooter(statisticsFooter).getElement(), RenderPosition.BEFOREEND);
