import {getRandomInteger} from "../utils.js";

const generateName = () => {
  const name = [
    `emoji-smile`,
    `emoji-sleeping`,
    `emoji-puke`,
    `emoji-angry`
  ];
  const randomIndex = getRandomInteger(0, name.length - 1);

  return name[randomIndex];
};

const generateIcon = () => {
  const name = [
    `smile.png`,
    `sleeping.png`,
    `puke.png`,
    `angry.png`
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

export const generateComment = (id) => {
  // const {name: alt} = generateName();
  // const {name: icon} = generateIcon();
  // const {descriptions: text} = generateDescription();

  return {
    id,
    icon: generateIcon(),
    alt: generateName(),
    text: generateDescription(),
    author: `Tim Macoveev`,
    date: `2019/12/31 23:59`
  };
};

export const generateCommentList = () => {
  const commentsList = [];

  for (let i = 1; i < getRandomInteger(5, 20); i++) {
    commentsList.push(generateComment(i));
  }

  return commentsList;
};
