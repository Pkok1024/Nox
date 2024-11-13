/** @format */

import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

async function nekopoilatest() {
  try {
    const response = await fetch('https://nekopoi.care/');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    const $ = cheerio.load(data);
    const hasil = [];

    $('#boxid > div').each(function (a, b) {
      const result = {
        title: $(b).find('> div.eroinfo > h2 > a').text(),
        epsd_url: $(b).find('> div.eroinfo > h2 > a').attr('href'),
        thumb: $(b).find('> div.eroimg > div > img').attr('src'),
        up_date: $(b).find('> div.eroinfo > span:nth-child(2)').text(),
        url: $(b).find('> div.eroinfo > span:nth-child(3) > a').attr('href'),
      };
      hasil.push(result);
    });

    return hasil;
  } catch (error) {
    throw error;
  }
}
export default nekopoilatest;
