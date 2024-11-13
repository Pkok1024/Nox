/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

async function doujindesuch(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const hasil = [];
        $('#chapter_list > ul > li').each(async function (a, b) {
          const result = {
            title: $(b).find('> div.chright > span > a').attr('title'),
            url: $(b).find('> div.chright > span > a').attr('href'),
          };
          hasil.push(result);
        });
        resolve(hasil);
      })
      .catch(reject);
  });
}
export default doujindesuch;
