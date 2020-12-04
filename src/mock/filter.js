import {FILTERTITLES} from "../const.js";

export const generateFilter = (movieCount) => {
  let watchlistCount = 0;
  let historyCount = 0;
  let favoritesCount = 0;

  for (let i = 0; i < movieCount.length; i++) {

    if (movieCount[i].addToWatchlist === true) {
      watchlistCount++;
    }
    if (movieCount[i].alreadyWatched === true) {
      historyCount++;
    }
    if (movieCount[i].addTofavorites === true) {
      favoritesCount++;
    }
  }

  return {
    name: FILTERTITLES,
    watchlistCount,
    historyCount,
    favoritesCount
  };
};
