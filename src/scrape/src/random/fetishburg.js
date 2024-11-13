/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

const instance = axios.create();

const getRandomVideoUrl = async title => {
  try {
    const response = await instance.get(
      `http://www.fetishburg.com/categories/${title}/`
    );
    const html = response.data;

    const $ = cheerio.load(html);

    const items = $('.box .list-videos .item');
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomItem = items.eq(randomIndex);
    const titles = randomItem.find('.title').text().replace(/\t|\n/g, '');
    const href = randomItem.find('a').attr('href');
    const thumb = randomItem.find('img').attr('src');
    const duration = randomItem.find('.duration').text();

    if (!href) {
      throw new Error('No video link found.');
    }

    const videoResponse = await instance.get(href);
    const videoHtml = videoResponse.data;
    const videoUrl = cheerio
      .load(videoHtml)('div.player-holder script')
      .last()
      .html()
      .match(/video_url:\s*'([^']+)'/)[1];

    if (!videoUrl) {
      throw new Error('No video URL found.');
    }

    return {
      title: titles,
      videoUrl,
      thumb,
      duration,
    };
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};

export default getRandomVideoUrl;
