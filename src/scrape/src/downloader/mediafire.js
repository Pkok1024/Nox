/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

export async function mediafire(url) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const urlFile = $('a#downloadButton').attr('href');
    const sizeFile = $('a#downloadButton')
      .text()
      .replace('Download', '')
      .replace('(', '')
      .replace(')', '')
      .replace(/\n/g, '')
      .trim();

    const split = urlFile.split('/');
    const nameFile = split[5];
    const mime = nameFile.split('.')[1];

    const result = {
      title: nameFile,
      size: sizeFile,
      url: urlFile,
      mime,
    };

    return result;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}
export default mediafire;
