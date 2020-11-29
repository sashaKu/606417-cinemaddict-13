export const createSiteMenuTemplate = (filter) => {
  const {item} = filter;
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">${item.title[0]}</a>
    <a href="#watchlist" class="main-navigation__item">${item.title[1]} <span class="main-navigation__item-count">${item.count}</span></a>
    <a href="#history" class="main-navigation__item">${item.title[2]} <span class="main-navigation__item-count">${item.count}</span></a>
    <a href="#favorites" class="main-navigation__item">${item.title[3]} <span class="main-navigation__item-count">${item.count}</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};
