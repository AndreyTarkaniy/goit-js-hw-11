import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './js/news-service.js';
import { createMarkupFoto } from './js/createMarkupFoto.js';

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
  newsApiService.query = e.target.elements.searchQuery.value.trim();
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(appendFotosMarkup);
}

function handleLoadMoreFotoClick() {
  newsApiService.fetchArticles().then(appendFotosMarkup);
}

function appendFotosMarkup(hits) {
  refs.fotoCard.insertAdjacentHTML('beforeend', createMarkupFoto(hits));
}

function clearFotosSearch() {
  refs.fotoCard.innerHTML = '';
}
// const gallery = new SimpleLightbox('.gallery a');
