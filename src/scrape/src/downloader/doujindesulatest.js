/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

async function doujindesulatest() {
  return new Promise((resolve, reject) => {
    axios
      .get('https://doujindesu.tv')
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const hasil = [];
        $('#archives > div > article').each(async function (a, b) {
          const result = {
            title: $(b).find('> a').attr('title'),
            link: 'https://doujindesu.tv' + $(b).find('> a').attr('href'),
            info: $(b).find('div > div > a > span').text(),
            type: $(b).find('> a > figure > span').text(),
            thumb: $(b).find('> a > figure > img').attr('src'),
          };
          hasil.push(result);
        });
        resolve(hasil);
      })
      .catch(reject);
  });
}
export default doujindesulatest;
