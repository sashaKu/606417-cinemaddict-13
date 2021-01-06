import AbstractView from "./abstract.js";

const createMainContentTemplate = () => {

  return `<section class="films"></section>`;
};

export default class MainContentView extends AbstractView {
  getTemplate() {

    return createMainContentTemplate();
  }
}
