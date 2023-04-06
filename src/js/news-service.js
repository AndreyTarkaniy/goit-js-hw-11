export default class NewsApiService {
  constructor() {}

  fetchArticles(searhcQuery) {
    fetch(
      `https://pixabay.com/api/?key=34996310-6eb230e6525d45c07c1c5f00a&q=${searhcQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
    )
      .then(response => response.json())
      .then(console.log);
    //   .then(data => renderList(data.hits));
  }
}
