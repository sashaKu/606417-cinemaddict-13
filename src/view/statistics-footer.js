import {createElement} from "../utils.js";

const createStatisticsFooterTemplate = (statistic) => {

  const {count} = statistic;

  return `<p>${count} movies inside</p>`;
};

export default class StatisticsFooter {
  constructor(statistic) {
    this._statistic = statistic;

    this._element = null;
  }

  getTemplate() {

    return createStatisticsFooterTemplate(this._statistic);
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
