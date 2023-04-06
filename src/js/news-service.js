import axios from 'axios';
// axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class NewsApiService {
  BASE_URL = 'https://pixabay.com/api';
  API_KEY = '34996310-6eb230e6525d45c07c1c5f00a';

  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
    const params = new URLSearchParams({
      key: this.API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 10,
      page: this.page,
    });

    const { data } = await axios(`${this.BASE_URL}/?${params}`);
    this.incrementPage();
    return data;
  }

  //   fetchArticles() {
  //     return fetch(
  //       `${this.BASE_URL}/?key=${this.API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${this.page}`
  //     )
  //       .then(response => response.json())
  //       .then(({ hits }) => {
  //         this.incrementPage();
  //         return hits;
  //       });
  //   }

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
