import {getRandomInteger, generateBoolean} from "../utils.js";
import {generateCommentList} from "./comment.js";

const generateName = () => {
  const name = [
    {
      name: `made for each other`,
      poster: `made-for-each-other.png`
    },
    {
      name: `popeye meets sinbad`,
      poster: `popeye-meets-sinbad.png`
    },
    {
      name: `sagebrush trail`,
      poster: `sagebrush-trail.jpg`
    },
    {
      name: `santa claus conquers the martians`,
      poster: `santa-claus-conquers-the-martians.jpg`
    },
    {
      name: `the dance of life`,
      poster: `the-dance-of-life.jpg`
    },
    {
      name: `the great flamarion`,
      poster: `the-great-flamarion.jpg`
    },
    {
      name: `the man with the golden arm`,
      poster: `the-man-with-the-golden-arm.jpg`
    }
  ];
  const randomIndex = getRandomInteger(0, name.length - 1);

  return name[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

// От 1 до 5 случайных предложений из descriptions[]
const randomDescription = () => {
  let content = generateDescription() + ` `;

  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    content += generateDescription() + ` `;
  }

  return content;
};

export const generateMovie = (id) => {
  const {name: title} = generateName();
  const {poster} = generateName();
  const description = randomDescription();
  const addToWatchlist = generateBoolean();
  const alreadyWatched = generateBoolean();
  const addTofavorites = generateBoolean();

  return {
    id,
    title,
    subTitle: `The Great Flamarion`,
    poster,
    date: 1929,
    director: `Anthony Mann`,
    writer: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
    actor: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
    release: `30 March 1945`,
    runtime: `1h 18m`,
    country: `USA`,
    genre: `Drama`,
    rating: 8.3,
    age: 18,
    description,
    addToWatchlist,
    alreadyWatched,
    addTofavorites,
    comments: generateCommentList()
  };
};

export const generateMovieList = () => {
  const moviesList = [];

  for (let i = 1; i < getRandomInteger(10, 20); i++) {
    moviesList.push(generateMovie(i));
  }

  return moviesList;
};
