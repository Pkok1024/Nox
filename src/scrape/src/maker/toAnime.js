/** @format */

import fetch from 'node-fetch';

async function fetchAnimeData(imageBuffer) {
  const api = 'https://api.taoanhdep.com/public/anime.php';
  const base64String = imageBuffer.toString('base64');
  const body = new URLSearchParams();
  body.set('image', base64String);

  const response = await fetch(api, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
    method: 'POST',
  });

  const data = await response.json();
  return data.img;
}

export default fetchAnimeData;
