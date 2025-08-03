import axios from 'axios';

const API_KEY = '15433898-8e738b4ae400445fc36a380ef';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 20,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
