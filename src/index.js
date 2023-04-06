import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './js/news-service.js';
import { createMarkupPhoto } from './js/createMarkupPhoto.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const newsApiService = new NewsApiService();

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  searchBtn: document.querySelector('.search'),
  photoCard: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', handleSearchPhotoSubmit);
refs.loadMoreBtn.addEventListener('click', getArticles);

refs.loadMoreBtn.hidden = true;

function handleSearchPhotoSubmit(e) {
  e.preventDefault();

  clearPhotosSearch();
  newsApiService.query = e.target.elements.searchQuery.value.trim();
  // console.log(newsApiService);

  if (newsApiService.query === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  getArticles();

  newsApiService.resetPage();
  refs.loadMoreBtn.hidden = false;

  // newsApiService.fetchArticles().then(hits => {
  //   appendPhotosMarkup(hits);
  // });
}

// function handleLoadMorePhotoClick() {
//   newsApiService.fetchArticles().then(imag => {
//     appendPhotosMarkup(imag);
//     refs.loadMoreBtn.hidden = false;
//   });
// }

async function getArticles() {
  try {
    const { hits, totalHits } = await newsApiService.fetchArticles();
    appendPhotosMarkup(hits);

    // if (!hits.length) {
    //   refs.loadMoreBtn.hidden = true;
    //   clearPhotosSearch();
    //   Notify.failure(
    //     'Sorry, there are no images matching your search query. Please try again.'
    //   );
    // } else if (refs.photoCard.children.length >= totalHits) {
    //   refs.loadMoreBtn.hidden = true;
    //   Notify.info("Were sorry, but you've reached the end of search results.");
    // }

    if (!hits.length) {
      refs.loadMoreBtn.hidden = true;
      clearPhotosSearch();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (refs.photoCard.children.length >= totalHits) {
      refs.loadMoreBtn.hidden = true;
      Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      setTimeout(() => {
        const imagesLeft = totalHits - refs.photoCard.children.length;
        Notify.success(`Hooray! We found ${imagesLeft} images.`);
      }, 800);
    }
  } catch (error) {
    console.log(error);
  }
}

function appendPhotosMarkup(imag) {
  refs.photoCard.insertAdjacentHTML('beforeend', createMarkupPhoto(imag));
}

function clearPhotosSearch() {
  refs.photoCard.innerHTML = '';
}
// new SimpleLightbox.refresh('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });
