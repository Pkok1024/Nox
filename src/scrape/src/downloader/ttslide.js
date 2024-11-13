/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function ttSlide(url) {
  try {
    const response = await axios.post(
      'https://api.ttsave.app/',
      {
        id: url,
        hash: '1e3a27c51eb6370b0db6f9348a481d69',
        mode: 'slide',
        locale: 'en',
        loading_indicator_url: 'https://ttsave.app/images/slow-down.gif',
        unlock_url: 'https://ttsave.app/en/unlock',
      },
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    const html = response.data;
    const $ = cheerio.load(html);

    const results = [];

    $('div.flex.flex-col.items-center.justify-center.mt-2.mb-5').each(
      (index, element) => {
        const $element = $(element);
        const data = {
          author: author,
          uniqueId: $element.find('input#unique-id').attr('value'),
          username: $element
            .find('div.flex.flex-row.items-center.justify-center h2')
            .text(),
          profile: $element.find('a').first().find('img').attr('src'),
          downloads: $element.find('a').first().attr('href'),
          title: $element.find('a').first().text(),
          hashtags: $element
            .find('p.text-gray-600')
            .text()
            .split(' ')
            .filter(Boolean),
          likes: $element
            .find('div.flex.flex-row.items-center.justify-center')
            .eq(0)
            .find('span')
            .text(),
          comments: $element
            .find('div.flex.flex-row.items-center.justify-center')
            .eq(1)
            .find('span')
            .text(),
          shares: $element
            .find('div.flex.flex-row.items-center.justify-center')
            .eq(2)
            .find('span')
            .text(),
          saveds: $element
            .find('div.flex.flex-row.items-center.justify-center')
            .eq(3)
            .find('span')
            .text(),
          views: $element
            .find('div.flex.flex-row.items-center.justify-center')
            .eq(4)
            .find('span')
            .text(),
        };
        results.push(data);
      }
    );

    return results;
  } catch (error) {
    console.error(error);
  }
}
