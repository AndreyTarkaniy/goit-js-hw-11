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

let searhcQuery = '';

function handleSearchFotoSubmit(e) {
  e.preventDefault();

  searhcQuery = e.target.elements.searchQuery.value;

  newsApiService.fetchArticles(searhcQuery);
}

// function renderList(galleryItems) {
//   const elementFoto = galleryItems
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) =>
//         `<div class="gallery__item ">
//         <a class= "gallery__link" href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>

//              <div class="info">
//               <p class="info-item">
//                 <b>Likes ${likes}</b>
//               </p>
//               <p class="info-item">
//                 <b>Views ${views}</b>
//               </p>
//               <p class="info-item">
//                 <b>Comments ${comments}</b>
//               </p>
//               <p class="info-item">
//                 <b>Downloads ${downloads}</b>
//               </p>
//             </div>
//           </div>`
//     )
//     .join('');

//   refs.fotoCard.insertAdjacentHTML('beforeend', elementFoto);
// }

function handleLoadMoreFotoClick() {
  newsApiService.fetchArticles(searhcQuery);
}
// const gallery = new SimpleLightbox('.gallery a');
