import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './js/news-service.js';

const newsApiService = new NewsApiService();

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  searchBtn: document.querySelector('.search'),
  fotoCard: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', handleSearchFotoSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreFotoClick);

function handleSearchFotoSubmit(e) {
  e.preventDefault();

  clearFotosSearch();
  newsApiService.query = e.target.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(appendFotosMarkup);
}

function handleLoadMoreFotoClick() {
  newsApiService.fetchArticles().then(appendFotosMarkup);
}

function appendFotosMarkup(hits) {
  const elementFoto = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="gallery__item ">
        <a class= "gallery__link" href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>

             <div class="info">
              <p class="info-item">
                <b>Likes ${likes}</b>
              </p>
              <p class="info-item">
                <b>Views ${views}</b>
              </p>
              <p class="info-item">
                <b>Comments ${comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads ${downloads}</b>
              </p>
            </div>
          </div>`
    )
    .join('');

  refs.fotoCard.insertAdjacentHTML('beforeend', elementFoto);
}

function clearFotosSearch() {
  refs.fotoCard.innerHTML = '';
}
// const gallery = new SimpleLightbox('.gallery a');
