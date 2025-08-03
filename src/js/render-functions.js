import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
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
      }) => `
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
      `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('active');
}

export function hideLoader() {
  loader.classList.remove('active');
}
