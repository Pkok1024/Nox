/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

export default function styleText(text) {
  return new Promise((resolve, reject) => {
    axios.get('http://qaz.wtf/u/convert.cgi?text=' + text).then(({ data }) => {
      let $ = cheerio.load(data);
      let result = [];
      $('table > tbody > tr').each(function (a, b) {
        result.push({
          text: $(b).find('td:nth-child(2)').text().trim(),
        });
      }),
        resolve(result);
    });
  });
}
