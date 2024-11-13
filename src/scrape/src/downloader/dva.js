/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

async function scrapeAppUrl(url) {
  try {
    const response = await axios.get(url + '?download');
    const html = response.data;
    const $ = cheerio.load(html);
    let appLink = $('.app').attr('href');

    while (!appLink) {
      console.log('Download button is not available yet. Waiting...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      const res = await axios.get(url + '?download');
      const html = res.data;
      const $ = cheerio.load(html);
      appLink = $('.app').attr('href');
    }

    const responseApp = await axios.get(appLink);
    const htmlApp = responseApp.data;
    const $2 = cheerio.load(htmlApp);
    const downloadButton = $2('#download-now');

    if (!downloadButton.length) {
      throw new Error('Download button not found');
    }

    const downloadUrl = downloadButton.attr('href');
    return downloadUrl;
  } catch (error) {
    console.error('Error:', error);
    return 'Error occurred while scraping the URL';
  }
}

async function scrapeGameData(query) {
  try {
    const url = `https://gamedva.com/?s=${query}`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const results = $('article')
      .map((index, element) => {
        const title = $(element).find('.entry-title').text();
        const excerpt = $(element).find('.entry-excerpt').text();
        const href = $(element).find('a').attr('href');
        const imageSrc =
          $(element).find('img').attr('data-cfsrc') ||
          $(element).find('img').attr('src');

        return {
          title,
          excerpt,
          url: href,
          imageSrc,
        };
      })
      .get();

    return results;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export { scrapeAppUrl, scrapeGameData };
