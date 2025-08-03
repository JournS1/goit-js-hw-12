import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
          <div class="img-wrap">
            <a href="${largeImageURL}" class="gallery-link">
              <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
            </a>
          </div>
          <div class="info">
            <div class="text-info"><span><b>Likes</b></span><span>${likes}</span></div>
            <div class="text-info"><span><b>Views</b></span><span>${views}</span></div>
            <div class="text-info"><span><b>Comments</b></span><span>${comments}</span></div>
            <div class="text-info"><span><b>Downloads</b></span><span>${downloads}</span></div>
          </div>
        </li>
      `;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

const loadMoreBtn = document.querySelector('.btn-more');
const loaderWrapper = document.querySelector('.loader');

export function showLoader() {
  loaderWrapper.classList.add('active');
}

export function hideLoader() {
  loaderWrapper.classList.remove('active');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.add('active');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove('active');
}
