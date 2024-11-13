/** @format */

import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

async function xnxxDownloader(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'get',
    })
      .then(response => response.text())
      .then(html => {
        const $ = cheerio.load(html, { xmlMode: false });

        // Mengambil metadata
        const title = $('meta[property="og:title"]').attr('content');
        const duration = $('meta[property="og:duration"]').attr('content');
        const image = $('meta[property="og:image"]').attr('content');
        const videoType = $('meta[property="og:video:type"]').attr('content');
        const videoWidth = $('meta[property="og:video:width"]').attr('content');
        const videoHeight = $('meta[property="og:video:height"]').attr(
          'content'
        );
        const info = $('span.metadata').text().trim();
        const scriptContent = $(
          '#video-player-bg > script:nth-child(6)'
        ).html();

        // Fungsi untuk mengambil URL video
        const extractUrl = pattern =>
          (scriptContent.match(pattern) || [])[1] || null;

        // Mengambil URL video
        const files = {
          low: extractUrl(/html5player.setVideoUrlLow'(.*?)';/),
          high: extractUrl(/html5player.setVideoUrlHigh'(.*?)';/),
          HLS: extractUrl(/html5player.setVideoHLS'(.*?)';/),
          thumb: extractUrl(/html5player.setThumbUrl'(.*?)';/),
          thumb69: extractUrl(/html5player.setThumbUrl169'(.*?)';/),
          thumbSlide: extractUrl(/html5player.setThumbSlide'(.*?)';/),
          thumbSlideBig: extractUrl(/html5player.setThumbSlideBig'(.*?)';/),
        };

        resolve({
          status: true,
          title,
          URL: url,
          duration,
          image,
          videoType,
          videoWidth,
          videoHeight,
          info,
          files,
        });
      })
      .catch(err => {
        console.error('Error fetching data:', err); // Logging kesalahan
        reject({
          status: false,
          result: err,
        });
      });
  });
}

export default xnxxDownloader;
