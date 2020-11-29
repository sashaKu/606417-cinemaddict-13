import {getRandomInteger} from "../utils.js";
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
// От 0 до 5 комментариев
const generateComments = () => {
  const count = getRandomInteger(0, 5);
  return count;
};
export const generateMovie = () => {
  return {
    title: `The Great Flamarion`,
    subTitle: `The Great Flamarion`,
    poster: `santa-claus-conquers-the-martians.jpg`,
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
    description: randomDescription(),
    addToWatchlist: false,
    alreadyWatched: false,
    addTofavorites: false,
    comments: generateComments()
  };
};
