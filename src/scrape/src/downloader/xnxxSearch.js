/** @format */

import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

async function xnxxSearch(query) {
  return new Promise((resolve, reject) => {
    const baseUrl = 'http://www.xnxx.com';
    fetch(`${baseUrl}/search/${query}/${Math.floor(3 * Math.random()) + 1}`, {
      method: 'get',
    })
      .then(response => response.text())
      .then(html => {
        const $ = cheerio.load(html);
        const links = [];
        const titles = [];
        const infos = [];
        const results = [];

        // Mengambil link dari div.mozaique
        $('div.mozaique').each(function () {
          $(this)
            .find('div.thumb')
            .each(function () {
              const link =
                baseUrl +
                $(this).find('a').attr('href').replace('/THUMBNUM/', '/');
              links.push(link);
            });
        });

        // Mengambil metadata dari div.mozaique
        $('div.mozaique').each(function () {
          $(this)
            .find('div.thumb-under')
            .each(function () {
              infos.push($(this).find('p.metadata').text());
              $(this)
                .find('a')
                .each(function () {
                  titles.push($(this).attr('title'));
                });
            });
        });

        // Menggabungkan semua data ke dalam satu array hasil
        for (let index = 0; index < titles.length; index++) {
          results.push({
            title: titles[index],
            info: infos[index],
            link: links[index],
          });
        }

        resolve({
          status: true,
          result: results,
        });
      })
      .catch(err => {
        console.error('Error fetching data:', err); // logging kesalahan
        reject({
          status: false,
          result: err,
        });
      });
  });
}

export default xnxxSearch;
