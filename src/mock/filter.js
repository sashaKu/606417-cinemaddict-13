import {getRandomInteger} from "../utils.js";
import {FILTERTITLES} from "../const.js";

const countMovies = getRandomInteger(0, 25);

export const generateFilter = () => {

  return {
    item: {
      title: FILTERTITLES,
      count: countMovies
    }
  };
};
