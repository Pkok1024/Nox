/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

const pickRandom = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
];

const scrapeCoomerData = async baseUrl => {
  const uniquePageLinks = {};

  const getConfigWithRandomUserAgent = () => {
    const randomUserAgent = pickRandom(userAgents);
    return {
      headers: {
        'User-Agent': randomUserAgent,
      },
    };
  };

  const getPageLinks = async () => {
    const response = await axios.get(baseUrl, getConfigWithRandomUserAgent());
    const $ = cheerio.load(response.data);
    const basePageLink = baseUrl.replace('https://coomer.su', '');
    const extractedPageLinks = $('menu a[href*="?o="]')
      .map((_, elem) => $(elem).attr('href'))
      .get();
    const uniquePageLinks = [...new Set(extractedPageLinks)];
    const allPageLinks = [basePageLink, ...uniquePageLinks];
    return allPageLinks;
  };

  const getPostUrls = async (pageLink, count = 1) => {
    const pageUrl = `https://coomer.su${pageLink}`;
    const response = await axios.get(pageUrl, getConfigWithRandomUserAgent());
    const $ = cheerio.load(response.data);

    const extractedPostUrls = $('a[href^="/onlyfans/user/"]')
      .map((_, elem) => $(elem).attr('href'))
      .get();

    return extractedPostUrls;
  };

  const getImageUrls = async postUrl => {
    const postResponse = await axios.get(
      `https://coomer.su${postUrl}`,
      getConfigWithRandomUserAgent()
    );
    const post$ = cheerio.load(postResponse.data);
    const imageUrls = post$('.post__files .fileThumb')
      .map((_, elem) => post$(elem).attr('href'))
      .get();
    return imageUrls;
  };

  let imageUrls = [];
  let retries = 300; // Jumlah percobaan ulang

  while (imageUrls.length === 0 && retries > 0) {
    const allPageLinks = await getPageLinks();
    const randomPageLink = pickRandom(allPageLinks);
    const postUrls = await getPostUrls(randomPageLink);
    const randomPostUrl = pickRandom(postUrls);
    imageUrls = await getImageUrls(randomPostUrl);
    retries--;
  }

  return {
    imageUrls,
  };
};

export default scrapeCoomerData;
