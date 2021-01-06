import AbstractView from "./abstract.js";

const createSiteMenuTemplate = (filter) => {

  const {name, watchlistCount, historyCount, favoritesCount} = filter;

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">${name[0]}</a>
    <a href="#watchlist" class="main-navigation__item">${name[1]} <span class="main-navigation__item-count">${watchlistCount}</span></a>
    <a href="#history" class="main-navigation__item">${name[2]} <span class="main-navigation__item-count">${historyCount}</span></a>
    <a href="#favorites" class="main-navigation__item">${name[3]} <span class="main-navigation__item-count">${favoritesCount}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

export default class SiteMenuView extends AbstractView {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {

    return createSiteMenuTemplate(this._filter);
  }
}
