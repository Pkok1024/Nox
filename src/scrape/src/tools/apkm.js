/** @format */

import * as cheerio from 'cheerio';
import axios from 'axios';
async function searchApkmirror(query) {
  const url = `https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    const body = await response.data;
    const $ = cheerio.load(body);
    console.log(response);
    return $('.appRow')
      .map((_, element) => ({
        image:
          'https://www.apkmirror.com' +
          $(element).find('.ellipsisText').attr('src'),
        link:
          'https://www.apkmirror.com' +
          $(element).find('.appRowTitle a').attr('href'),
        title: $(element).find('.appRowTitle a').text().trim(),
        developer: $(element).find('.byDeveloper').text().trim(),
        uploadDate: $(element).find('.dateyear_utc').text().trim(),
        version: $(element)
          .next('.infoSlide')
          .find('.infoSlide-value')
          .eq(0)
          .text()
          .trim(),
        fileSize: $(element)
          .next('.infoSlide')
          .find('.infoSlide-value')
          .eq(2)
          .text()
          .trim(),
        downloads: $(element)
          .next('.infoSlide')
          .find('.infoSlide-value')
          .eq(3)
          .text()
          .trim(),
      }))
      .get()
      .filter(obj => Object.values(obj).every(value => value !== ''));

    console.log($);
  } catch (error) {
    console.log(error);
  }
}
export default searchApkmirror;
