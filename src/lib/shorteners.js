/** @format */

import axios from 'axios';

async function VURL(url) {
  try {
    const response = await axios.get(`https://vurl.com/api.php?url=${url}`);
    return response.data;
  } catch (error) {
    throw new Error(`HTTP error! Status: ${error.response.status}`);
  }
}

async function shortenWithVgd(url) {
  try {
    const response = await axios.get(
      `https://v.gd/create.php?format=json&url=${url}`
    );
    return response.data.shorturl;
  } catch (error) {
    throw new Error(`HTTP error! Status: ${error.response.status}`);
  }
}

async function shortenWithIsGd(url) {
  try {
    const response = await axios.get(
      `https://is.gd/create.php?format=json&url=${url}`
    );
    console.log(response);
    return response.data.shorturl;
  } catch (error) {
    console.log(error);
  }
}

function shorter(url) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        'https://shorter.me/page/shorten',
        new URLSearchParams({
          url: url,
          alias: '',
          password: '',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Accept: '*/*',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent':
              'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
            Referer: 'https://shorter.me/',
          },
        }
      )
      .then(({ data }) => {
        resolve({
          url: data.data,
        });
      })
      .catch(error => {
        resolve({
          msg: error?.message || error,
        });
      });
  });
}

export { VURL, shortenWithVgd, shortenWithIsGd, shorter };
