/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function scrapeVideosByYear(year, mount) {
  const url = `https://www.xvideos.com/best/${year}-${mount}`;
  const cookie =
    'session_token=137a1b10dfbeca21ATZYerdXh5ioxzXAtnXzZ9KiCQVf-TrJqZ7nEKHQ6o2q4P87rUXpJb7293sfUpKg_LZw767rxiqQkoupRTJ1VRMz3n5hhmv9tV5KfDdsoGjNaAl5Rk45UglTQG-Lk7aZaNIZvkwZFZzmlKvAUvziAyW2fkroGO1VzWCRvsKhJFXoSVIEEWUnTs4KYTHpV6unIko9liwPq3E_IHTnsambKBMWtx67Uy1-XOfQGOiOMcItcKhi29dmFqDCJXv6lq5P';
  try {
    const response = await axios.get(url, {
      headers: {
        Cookie: cookie,
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const videoList = [];
    $('div.thumb-block').each((index, element) => {
      const title = $(element)
        .find('div.thumb-under p:first-child a')
        .attr('title');
      const thumbnail = $(element).find('div.thumb a img').attr('data-src');
      const videoUrl = $(element).find('div.thumb a').attr('href');

      videoList.push({
        title,
        thumbnail,
        videoUrl: 'https://www.xvideos.com' + videoUrl,
      });
    });

    return videoList;
  } catch (error) {
    console.error(error);
    return [];
  }
}
