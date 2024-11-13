/** @format */

import got from 'got';
import * as cheerio from 'cheerio';

let fetchSnapSave = inputUrl => {
  return new Promise(async resolve => {
    try {
      if (
        !inputUrl.match(
          /(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/
        ) &&
        !inputUrl.match(
          /(https|http):\/\/www.instagram.com\/(p|reel|tv|stories)/gi
        )
      ) {
        return resolve({
          message: `Invalid URL`,
        });
      }

      function decodeSnapAppArguments(args) {
        let [header, url, nonce, timestamp, encoding, radix] = args;

        function decodeData(data, encoding, radix) {
          const alphabet =
            '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split(
              ''
            );
          let header = alphabet.slice(0, encoding);
          let radixArray = alphabet.slice(0, radix);

          let decodedData = data
            .split('')
            .reverse()
            .reduce(function (acc, char, index) {
              if (header.indexOf(char) !== -1) {
                return (acc +=
                  header.indexOf(char) * Math.pow(encoding, index));
              }
            }, 0);
          let result = '';
          while (decodedData > 0) {
            result = radixArray[decodedData % radix] + result;
            decodedData = (decodedData - (decodedData % radix)) / radix;
          }
          return result || '0';
        }
        let result = '';
        for (let i = 0, len = header.length; i < len; i++) {
          let temp = '';

          while (header[i] !== nonce[encoding]) {
            temp += header[i];
            i++;
          }
          for (let j = 0; j < nonce.length; j++)
            temp = temp.replace(new RegExp(nonce[j], 'g'), j.toString());

          result += String.fromCharCode(
            decodeData(temp, encoding, 10) - timestamp
          );
        }
        return decodeURIComponent(encodeURIComponent(result));
      }

      function getEncodedArguments(data) {
        return data
          .split('decodeURIComponent(escape(r))}(')[1]
          .split('))')[0]
          .split(',')
          .map(v => v.replace(/"/g, '').trim());
      }

      function getDecodedSnapSaveData(data) {
        return data
          .split('getElementById("download-section").innerHTML = "')[1]
          .split('"; document.getElementById("inputData").remove(); ')[0]
          .replace(/\\(\\)?/g, '');
      }

      function decryptSnapSaveData(data) {
        return getDecodedSnapSaveData(
          decodeSnapAppArguments(getEncodedArguments(data))
        );
      }

      const response = await got
        .post('https://snapsave.app/action.php?lang=id', {
          headers: {
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'content-type': 'application/x-www-form-urlencoded',
            origin: 'https://snapsave.app',
            referer: 'https://snapsave.app/id',
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
          },
          form: {
            url: inputUrl,
          },
        })
        .text();

      const decryptedData = decryptSnapSaveData(response);
      const $ = cheerio.load(decryptedData);
      const results = [];

      if ($('table.table').length || $('article.media > figure').length) {
        const thumbnailUrl = $('article.media > figure')
          .find('img')
          .attr('src');
        $('tbody > tr').each((_, element) => {
          const $element = $(element);
          const $td = $element.find('td');
          const resolution = $td.eq(0).text();
          let downloadUrl =
            $td.eq(2).find('a').attr('href') ||
            $td.eq(2).find('button').attr('onclick');
          const shouldRender = /get_progressApi/gi.test(downloadUrl || '');
          if (shouldRender) {
            const match = /get_progressApi\('(.*?)'\)/.exec(downloadUrl || '');
            downloadUrl = match ? match[1] || downloadUrl : downloadUrl;
          }

          results.push({
            resolution,
            thumbnailUrl,
            downloadUrl,
            shouldRender,
          });
        });
      } else {
        $('div.download-items__thumb').each((_, thumbElement) => {
          const thumbnailUrl = $(thumbElement).find('img').attr('src');
          $('div.download-items__btn').each((_, buttonElement) => {
            let downloadUrl = $(buttonElement).find('a').attr('href');
            if (!/https?:\/\//.test(downloadUrl || ''))
              downloadUrl = `https://snapsave.app${downloadUrl}`;
            results.push({
              thumbnailUrl,
              downloadUrl,
            });
          });
        });
      }

      if (!results.length) {
        return resolve({
          status: false,
          message: `No data found`,
        });
      }

      return resolve({
        data: results,
      });
    } catch (error) {
      return resolve({
        status: false,
        message: error.message,
      });
    }
  });
};

export default fetchSnapSave;
