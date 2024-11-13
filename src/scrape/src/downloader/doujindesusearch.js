/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

async function doujindesusearch(query) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://doujindesu.tv/?s=${query}`)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const hasil = [];
        $('#archives > div > article').each(async function (a, b) {
          const result = {
            link: 'https://doujindesu.tv' + $(b).find('> a').attr('href'),
            thumb: $(b).find('> a > figure > img').attr('src'),
            title: $(b).find('> a > figure > img').attr('title'),
            type: $(b).find('> a > figure > span').text(),
            status: $(b).find('> a > div > div.status').text(),
            score: $(b).find('> a > div > div.score').text(),
          };
          hasil.push(result);
        });
        resolve(hasil);
      })
      .catch(reject);
  });
}

export default doujindesusearch;
