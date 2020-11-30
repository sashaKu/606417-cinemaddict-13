import {FILTERTITLES} from "../const.js";

export const generateFilter = (movieCount) => {

  return {
    name: FILTERTITLES,
    count: movieCount
  };
};
