export const createSortTemplate = (sort) => {
  const {name} = sort;
  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">${name[0]}</a></li>
  <li><a href="#" class="sort__button">${name[1]}</a></li>
  <li><a href="#" class="sort__button">${name[2]}</li>
</ul>`;
};
