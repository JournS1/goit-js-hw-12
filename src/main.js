import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import warningIcon from './img/warning-img.png';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.btn-more');

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  query = form.elements['search-text'].value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits, totalHits: total } = await getImagesByQuery(query, page);
    hideLoader();
    if (hits.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconUrl: warningIcon,
        maxWidth: 432,
      });
      return;
    }
    totalHits = total;
    createGallery(hits);
    showLoadMoreButton();
    const totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: 'The end of search results.',
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconUrl: warningIcon,
        maxWidth: 432,
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'We are sorry, but you have reached the end of search results.',
      messageColor: '#fff',
      messageSize: '16px',
      backgroundColor: '#ef4040',
      position: 'topRight',
      iconUrl: warningIcon,
      maxWidth: 432,
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  try {
    const { hits } = await getImagesByQuery(query, page);
    createGallery(hits);
    const totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fff',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        position: 'topRight',
        iconUrl: warningIcon,
        maxWidth: 432,
      });
    }
    hideLoader();

    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Error',

      messageColor: '#fff',
      messageSize: '16px',
      backgroundColor: '#ef4040',
      position: 'topRight',
      iconUrl: warningIcon,
      maxWidth: 432,
    });
  }
});
