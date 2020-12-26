import {createElement} from "../utils.js";

const createWriteCommentTemplate = (comment) => {

  const {icons, alts} = comment;

  return `<div class="film-details__add-emoji-label"></div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
  </label>

  <div class="film-details__emoji-list">
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
    <label class="film-details__emoji-label" for="emoji-smile">
      <img src="./images/emoji/${icons[0]}" width="30" height="30" alt="${alts[0]}">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
    <label class="film-details__emoji-label" for="emoji-sleeping">
      <img src="./images/emoji/${icons[1]}" width="30" height="30" alt="${alts[1]}">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
    <label class="film-details__emoji-label" for="emoji-puke">
      <img src="./images/emoji/${icons[2]}" width="30" height="30" alt="${alts[2]}">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
    <label class="film-details__emoji-label" for="emoji-angry">
      <img src="./images/emoji/${icons[3]}" width="30" height="30" alt="${alts[3]}">
    </label>
  </div>`;
};

export default class WriteComment {
  constructor(comment) {
    this._comment = comment;

    this._element = null;
  }

  getTemplate() {

    return createWriteCommentTemplate(this._comment);
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

