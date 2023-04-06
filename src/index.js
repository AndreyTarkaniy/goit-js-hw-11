import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  button: document.querySelector('button'),
  fotoCard: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', handleFotoSubmit);

function handleFotoSubmit(e) {
  e.preventDefault();

  const query = refs.input.value;

  fetch(
    `https://pixabay.com/api/?key=34996310-6eb230e6525d45c07c1c5f00a&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
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
const gallery = new SimpleLightbox('.gallery a');
