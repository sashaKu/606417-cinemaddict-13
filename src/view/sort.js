import {createElement} from "../utils.js";

const createSortTemplate = (sort) => {

  const {name} = sort;

  return `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">${name[0]}</a></li>
  <li><a href="#" class="sort__button">${name[1]}</a></li>
  <li><a href="#" class="sort__button">${name[2]}</li>
</ul>`;
};

export default class Sort {
  constructor(sort) {
    this._sort = sort;
    this._element = null;
  }

  getTemplate() {

    return createSortTemplate(this._sort);
  }

  getElement() {

    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
