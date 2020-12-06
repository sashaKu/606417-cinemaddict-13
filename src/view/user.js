import {createElement} from "../utils.js";

const createUserTemplate = (user) => {

  const {state, avatar} = user;

  return `<section class="header__profile profile">
  <p class="profile__rating">${state}</p>
  <img class="profile__avatar" src="images/${avatar}" alt="Avatar" width="35" height="35">
</section>`;
};

export default class User {
  constructor(user) {
    this._user = user;

    this._element = null;
  }

  getTemplate() {

    return createUserTemplate(this._user);
  }

  getElement() {

    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

