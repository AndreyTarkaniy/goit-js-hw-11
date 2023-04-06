import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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

  // const searhcQuery = e.target.elements.query.value;
  searhcQuery = refs.input.value;

  fetch(
    `https://pixabay.com/api/?key=34996310-6eb230e6525d45c07c1c5f00a&q=${searhcQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
  )
    .then(response => response.json())
    .then(data => renderList(data.hits));
}

function renderList(galleryItems) {
  const elementFoto = galleryItems
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

function handleLoadMoreFotoClick() {
  fetch(
    `https://pixabay.com/api/?key=34996310-6eb230e6525d45c07c1c5f00a&q=${searhcQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
  )
    .then(response => response.json())
    .then(data => renderList(data.hits));
}
// const gallery = new SimpleLightbox('.gallery a');
