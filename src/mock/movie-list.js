import {getRandomInteger} from "../utils.js";

const generateList = () => {
  const randomIndex = getRandomInteger(0, 5);

  return randomIndex;
};

export const generateMovieList = () => {
  const count = generateList();

  return count;
};
