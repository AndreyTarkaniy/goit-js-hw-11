export default class NewsApiService {
  #KEY = '34996310-6eb230e6525d45c07c1c5f00a&q';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    return fetch(
      `https://pixabay.com/api/?key=${this.#KEY}&q=${
        this.searchQuery
      }&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${
        this.page
      }`
    )
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
      });

    //   .then(data => renderList(data.hits));
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
