/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

async function nkpepsddl(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const hasil = [];
        $(
          '#content > div.postsbody > div > div.arealinker > div.boxdownload > div'
        ).each(async function (a, b) {
          const dati = {
            Drop: $(b).find('> div.listlink > p > a:nth-child(1)').attr('href'),
            Slare: $(b)
              .find('> div.listlink > p > a:nth-child(2)')
              .attr('href'),
            StreamSB: $(b)
              .find('> div.listlink > p > a:nth-child(2)')
              .attr('href'),
            Dood: $(b).find('> div.listlink > p > a:nth-child(3)').attr('href'),
            Racaty: $(b)
              .find('> div.listlink > p > a:nth-child(4)')
              .attr('href'),
            ZippyShare: $(b)
              .find('> div.listlink > p > a:nth-child(5)')
              .attr('href'),
          };
          hasil.push(dati);
        });
        resolve(hasil);
      })
      .catch(reject);
  });
}
export default nkpepsddl;
