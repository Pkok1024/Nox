/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

async function komikindogetch(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const hasil = [];

    $('#chapter_list > ul > li').each(function () {
      const result = {
        status: 200,
        title: $(this).find('> span.lchx > a').text(),
        get_url: $(this).find('> span.lchx > a').attr('href'),
      };
      hasil.push(result);
    });

    return hasil; // Mengembalikan hasil sebagai Promise resolved
  } catch (error) {
    console.error('Error in komikindogetch function:', error); // Logging kesalahan
    throw new Error('Failed to fetch comic chapters: ' + error.message);
  }
}

export default komikindogetch;
