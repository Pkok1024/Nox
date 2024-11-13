/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

async function wikipedia(query) {
  try {
    const link = await axios.get(`https://id.m.wikipedia.org/wiki/${query}`);
    const $ = cheerio.load(link.data);
    const judul = $('#firstHeading').text().trim();
    const thumb =
      $('#mw-content-text')
        .find(
          'div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img'
        )
        .attr('src') || '//i.postimg.cc/Z5b1WDwD/1675949861324.jpg';
    const isi = [];

    $('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
      const penjelasan = $(Ra).find('p').text().trim();
      isi.push(penjelasan);
    });

    const result = isi.map(i => ({
      judul,
      thumb: 'https:' + thumb,
      isi: i,
    }));

    return {
      status: link.status,
      result,
    };
  } catch (err) {
    const notFound = {
      status: err.response.status,
      Pesan: err.message,
    };
    return notFound;
  }
}

export default wikipedia;
