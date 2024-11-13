/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

let no = 1;

async function nhentaisearch(query) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://nhentai.to/search?q=${query}`)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const hasil = [];
        $('body > div.container.index-container > div').each(
          async function (a, b) {
            const result = {
              author: '©lui',
              status: 200,
              index: `${no++}`,
              link: 'https://nhentai.to' + $(b).find('> a').attr('href'),
              thumb: $(b).find('> a > img:nth-child(2)').attr('src'),
              title: $(b).find('> a > div').text(),
            };
            hasil.push(result);
          }
        );
        resolve(hasil);
      })
      .catch(reject);
  });
}
export default nhentaisearch;
