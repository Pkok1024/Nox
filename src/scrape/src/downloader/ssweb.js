/** @format */

import axios from 'axios';

async function ssweb(url, device = 'desktop') {
  const baseURL = 'https://www.screenshotmachine.com';
  const params = {
    url: url,
    device: device,
    cacheLimit: 0,
  };

  try {
    // Memastikan URL valid
    new URL(url);

    const response = await axios({
      url: `${baseURL}/capture.php`,
      method: 'POST',
      data: new URLSearchParams(Object.entries(params)),
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    });

    const cookies = response.headers['set-cookie'];

    if (response.data.status === 'success') {
      const screenshotResponse = await axios.get(
        `${baseURL}/${response.data.link}`,
        {
          headers: {
            cookie: cookies.join('; '), // Menyatukan cookies dengan tanda ';'
          },
          responseType: 'arraybuffer',
        }
      );
      return screenshotResponse.data; // Mengembalikan data tangkapan layar
    } else {
      throw new Error('Capture failed: ' + response.data.message); // pesan kesalahan
    }
  } catch (error) {
    console.error('Error in ssweb function:', error); // logging untuk kesalahan
    throw new Error('Failed to capture screenshot: ' + error.message);
  }
}

export default ssweb;
