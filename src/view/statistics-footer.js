import AbstractView from "./abstract.js";

const createStatisticsFooterTemplate = (statistic) => {

  const {count} = statistic;

  return `<p>${count} movies inside</p>`;
};

export default class StatisticsFooter extends AbstractView {
  constructor(statistic) {
    super();
    this._statistic = statistic;
  }

  getTemplate() {

    return createStatisticsFooterTemplate(this._statistic);
  }
}
