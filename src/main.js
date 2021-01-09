import UserView from "./view/user.js";
import MainPresenter from "./presenter/main-presenter.js";
import StatisticsFooterView from "./view/statistics-footer.js";
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

const presenter = new MainPresenter(siteBodyElement, siteMainElement);

// Статистика в footer
const siteFooterElement = document.querySelector(`.footer`);
const siteStatisticsFooterElement = siteFooterElement.querySelector(`.footer__statistics`);
render(siteStatisticsFooterElement, new StatisticsFooterView(statisticsFooter), RenderPosition.BEFOREEND);

presenter.init(sort, comment, movies, filter, user);
