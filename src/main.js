import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';
import warningIcon from './img/warning-img.png';

const form = document.querySelector('.form');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = e.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconUrl: warningIcon,
        maxWidth: 432,
      });
    } else {
      createGallery(data.hits);
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
