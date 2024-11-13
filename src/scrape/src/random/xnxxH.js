/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

const xnxxHits = async (period = '') => {
  let url = 'https://www.xnxx.com/hits';

  if (period) {
    url += `/${period}`;
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const videos = [];

    $('.thumb-block').each((index, element) => {
      const title = $(element)
        .find('.thumb-under p:nth-child(1) a')
        .text()
        .trim();
      const views = $(element)
        .find('.metadata .right')
        .text()
        .trim()
        .replace(/\d{1,3}%/, '');
      const duration = $(element)
        .find('.metadata')
        .text()
        .trim()
        .split('\n')[1];
      const quality = $(element)
        .find('.metadata .video-hd')
        .text()
        .trim()
        .split(' ')[2];

      videos.push({
        title: title,
        views: views,
        duration: duration,
        quality: quality,
      });
    });

    return videos;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default xnxxHits;
