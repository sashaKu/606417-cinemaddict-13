export const createStatisticsFooterTemplate = (statistic) => {

  const {count} = statistic;

  return `<p>${count} movies inside</p>`;
};
