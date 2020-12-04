export const createUserTemplate = (user) => {

  const {state, avatar} = user;

  return `<section class="header__profile profile">
  <p class="profile__rating">${state}</p>
  <img class="profile__avatar" src="images/${avatar}" alt="Avatar" width="35" height="35">
</section>`;
};
