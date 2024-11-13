/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

async function dojindsgetimg(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const hasil = [];
        $('#anu > img').each(async function (a, b) {
          hasil.push($(b).attr('src'));
        });
        resolve(hasil);
      })
      .catch(reject);
  });
}
export default dojindsgetimg;
