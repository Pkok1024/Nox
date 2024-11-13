/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

const scrapeKomikCast = async searchTerm => {
  try {
    const url = `https://komikcast.cz/?s=${searchTerm}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const results = [];

    $('.list-update_items .list-update_item').each((index, element) => {
      const title = $(element).find('.title').text().trim();
      const url = $(element).find('a').attr('href');
      const img = $(element).find('img').attr('src');
      const chapter = $(element).find('.chapter').text().trim();
      const lastch = $(element).find('.chapter').attr('href');
      const score = $(element).find('.numscore').text().trim();
      const type = $(element).find('.type').text().trim();
      const typeClass = $(element).find('.type').attr('class');

      results.push({
        title,
        url,
        img,
        lastch,
        chapter,
        score,
        type,
      });
    });

    return results;
  } catch (error) {
    console.error('Error scraping KomikCast:', error);
    return [];
  }
};

export default scrapeKomikCast;
