import AbstractView from "./abstract.js";

const createMovieListEmptyTemplate = () => {

  return `<section class="films-list">
  <h2 class="films-list__title">There are no movies in our database</h2>
</section>`;
};

export default class MovieListEmptyView extends AbstractView {
  getTemplate() {

    return createMovieListEmptyTemplate();
  }
}
