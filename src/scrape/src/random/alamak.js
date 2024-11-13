/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

const userAgents = {
  UA_ANDROID:
    'Otakudesu 177.0.0.30.119 Android (18/4.3; 320dpi; 720x1280; Xiaomi; HM 1SW; armani; qcom; en_US)',
  UA_WINDOWS:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
  UA_IPHONE:
    'Otakudesu 123.0.0.21.114 (iPhone; CPU iPhone OS 11_4 like Mac OS X; en_US; en-US; scale=2.00; 750x1334) AppleWebKit/605.1.15',
};

class OtakudesuApi {
  constructor(baseURL = 'https://otakudesu.cloud', axiosOptions = {}) {
    this.baseURL = baseURL;
    this.AxiosOts = axios.create(axiosOptions);

    this.makeHeaders = (userAgent = userAgents.UA_WINDOWS, headers = {}) => {
      const defaultHeaders = {
        'user-agent': userAgent,
        'accept-language': 'en-US,en;q=0.6',
        'cache-control': 'max-age=0',
        'if-modified-since': 'Mon, 11 Mar 2024 20:00:16 GMT',
        'sec-ch-ua': userAgent,
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': 'Windows',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'sec-gpc': '1',
        'upgrade-insecure-requests': '1',
        'Referrer-Policy': 'same-origin',
      };

      return {
        ...defaultHeaders,
        ...headers,
      };
    };

    this.fetchUrl = (url = '', options = {}) => {
      const { agent = userAgents.UA_WINDOWS, axiosOptions = {} } = options;

      return this.AxiosOts.get(url, {
        baseURL: this.baseURL,
        headers: this.makeHeaders(agent, axiosOptions.headers),
        ...axiosOptions,
      });
    };

    this.parsePost = (html, post) => {
      const title = html(post).find('h2').text().trim();
      const episodes = parseInt(html(post).find('div.epz').text().trim());
      const date = html(post).find('div.newnime').text().trim();
      const image = html(post).find('img').attr('src');
      const url = html(post).find('a').attr('href');

      return {
        title,
        episodes,
        date,
        image,
        url,
      };
    };

    this.parseGenre = html => {
      const genres = [];

      html
        .trim()
        .split(',')
        .forEach(genre => {
          genres.push(genre.trim());
        });

      return genres;
    };

    this.filterDownload = (downloads, format) => {
      return downloads.filter(download => {
        return download.format.replace(' ', '-').toLowerCase() === format;
      });
    };

    this.filterMirror = (mirrors, format) => {
      return mirrors.filter(mirror => {
        return mirror.format === format;
      });
    };

    this.ongoing = (page = 1) => {
      return this.fetchUrl(`/ongoing-anime/page/${page}/`).then(response => {
        const $ = cheerio.load(response.data);
        const posts = $('.wp-block-column.column-90');

        const data = [];

        posts.each((index, post) => {
          data.push(this.parsePost($, post));
        });

        return data;
      });
    };

    this.animeList = (page = 1) => {
      return this.fetchUrl(`/anime-list/page/${page}/`).then(response => {
        const $ = cheerio.load(response.data);
        const posts = $('.wp-block-column.column-90');

        const data = [];

        posts.each((index, post) => {
          data.push(this.parsePost($, post));
        });

        return data;
      });
    };

    this.genre = (genre, page = 1) => {
      return this.fetchUrl(`/genre/${genre}/page/${page}/`).then(response => {
        const $ = cheerio.load(response.data);
        const posts = $('.wp-block-column.column-90');

        const data = [];

        posts.each((index, post) => {
          data.push(this.parsePost($, post));
        });

        return data;
      });
    };

    this.details = url => {
      return this.fetchUrl(url).then(response => {
        const $ = cheerio.load(response.data);

        const title = $('h1.entry-title').text().trim();
        const description = $('div.description').text().trim();
        const genre = this.parseGenre($('div.genres').text().trim());
        const episodes = parseInt($('div.episodes').text().trim());
        const date = $('div.date').text().trim();
        const image = $('div.thumbnail img').attr('src');

        const downloads = [];
        const mirrors = [];

        $('div.download-link ul li').each((index, link) => {
          const format = $('a', link).text().trim();
          const url = $('a', link).attr('href');

          downloads.push({
            format,
            url,
          });
        });

        $('div.download-link ul li ul li').each((index, link) => {
          const format = $('a', link).text().trim();
          const url = $('a', link).attr('href');

          mirrors.push({
            format,
            url,
          });
        });

        return {
          title,
          description,
          genre,
          episodes,
          date,
          image,
          downloads,
          mirrors,
        };
      });
    };

    this.downloadLink = (url, format) => {
      return this.fetchUrl(url).then(response => {
        const $ = cheerio.load(response.data);

        const downloadLink = $('div.download-link a').attr('href');
        const mirrors = [];

        $('div.download-link ul li').each((index, link) => {
          const mirrorFormat = $('a', link).text().trim();
          const mirrorUrl = $('a', link).attr('href');

          mirrors.push({
            format: mirrorFormat,
            url: mirrorUrl,
          });
        });

        const download = this.filterDownload(mirrors, format);

        if (download.length > 0) {
          return download[0].url;
        } else {
          return 'Download not found.';
        }
      });
    };

    this.mirrorLink = (url, format) => {
      return this.fetchUrl(url).then(response => {
        const $ = cheerio.load(response.data);

        const mirrorLink = $('div.download-link a').attr('href');
        const mirrors = [];

        $('div.download-link ul li').each((index, link) => {
          const mirrorFormat = $('a', link).text().trim();
          const mirrorUrl = $('a', link).attr('href');

          mirrors.push({
            format: mirrorFormat,
            url: mirrorUrl,
          });
        });

        const mirror = this.filterMirror(mirrors, format);

        if (mirror.length > 0) {
          return mirror[0].url;
        } else {
          return 'Mirror not found.';
        }
      });
    };

    this.filterDownload = (mirrors, format) => {
      return mirrors.filter(
        mirror => mirror.format.toLowerCase() === format.toLowerCase()
      );
    };

    this.filterMirror = (mirrors, format) => {
      return mirrors.filter(
        mirror => mirror.format.toLowerCase() === format.toLowerCase()
      );
    };

    this.parsePost = ($, post) => {
      const title = $('h2 a', post).text().trim();
      const url = $('h2 a', post).attr('href');
      const thumbnail = $('div.thumbnail img', post).attr('src');
      const date = $('div.date', post).text().trim();
      const episodes = $('div.episodes', post).text().trim();

      return {
        title,
        url,
        thumbnail,
        date,
        episodes,
      };
    };

    this.parseGenre = genre => {
      const genres = genre.split(',');

      return genres.map(g => g.trim());
    };

    this.fetchUrl = url => {
      return axios.get(baseUrl + url).catch(error => {
        console.error('Error:', error);
      });
    };
  }
}

module.exports = Scraper;
