/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function searchXvideo(
  query,
  short = '',
  date = '',
  duration = '',
  quality = '',
  page = ''
) {
  const sortParam = short ? `&sort=${short}` : '';
  const datefParam = date ? `&datef=${date}` : '';
  const durfParam = duration ? `&durf=${duration}` : '';
  const qualityParam = quality ? `&quality=${quality}` : '';
  const pageParam = quality ? `&p=${page}` : '';

  const url = `https://www.xvideos.com/?k=${query}${sortParam}${datefParam}${durfParam}${qualityParam}${pageParam}`;

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

    const videos = [];

    $('div.frame-block.thumb-block').each((index, element) => {
      const video = {};
      const $element = $(element);
      const href = $element.find('p.title a').attr('href');
      video.id = $element.attr('id').replace('video_', '');
      video.isChannel = $element.data('is-channel');
      video.title = $element.find('p.title a').text();
      video.url = 'https://www.xvideos.com' + href;
      video.duration = $element.find('p.metadata span').eq(1).text();
      video.hdMark = $element.find('span.video-hd-mark').text();
      video.thumbnail = $element.find('img').attr('data-src');
      video.thumbnailGif = $element.find('img').attr('src');
      video.channelName = $element.find('p.metadata a').text();
      video.channelHref = $element.find('p.metadata a').attr('href');

      videos.push(video);
    });

    return videos;
  } catch (error) {
    console.error(error);
    return [];
  }
}
