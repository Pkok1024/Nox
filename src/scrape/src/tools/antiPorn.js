/** @format */

import axios from 'axios';

async function cekGambar(img) {
  try {
    const response = await axios.get(
      `https://api.sightengine.com/1.0/check.json?url=${img}&models=nudity-2.0&api_user=1205877779&api_secret=wVsMFtL6xHPB93fAq3x3HhnVFtWgXNrX`
    );
    const data = response.data.nudity;
    return data;
  } catch (error) {
    console.error('Kesalahan dalam pemeriksaan gambar:', error);
  }
}

export default cekGambar;
