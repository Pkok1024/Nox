/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

async function Persamaan_Kata(kata) {
  const html = await axios.get(
    'https://m.persamaankata.com/search.php?q=' + kata
  );
  const $ = cheerio.load(html.data);
  const result = [];
  $('div.word_thesaurus > a').each(function (e, a) {
    result.push($(a).text());
  });
  const image = $('img#visual_synonym_img').attr('src');
  return {
    image,
    result,
  };
}

export default Persamaan_Kata;
