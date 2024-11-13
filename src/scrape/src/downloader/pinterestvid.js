/** @format */

import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

async function pinterestvideodownloader(t) {
  return new Promise(async (e, a) => {
    const i = new URLSearchParams();
    i.append('url', t);
    const o = await (
      await fetch('https://pinterestvideodownloader.com/', {
        method: 'POST',
        body: i,
      })
    ).text();
    $ = cheerio.load(o);
    const r = [];
    if (
      ($('table > tbody > tr').each(function (t, e) {
        $($(e).find('td')[0]).text() != '' &&
          r.push({
            url: $($(e).find('td')[0]).find('a').attr('href'),
          });
      }),
      r.length == 0)
    ) {
      return e({
        status: !1,
      });
    }
    e({
      status: !0,
      data: r,
    });
  });
}

export default pinterestvideodownloader;
