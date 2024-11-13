/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';

export default function search(querry) {
  return new Promise(async (resolve, reject) => {
    axios
      .get(`https://id.pinterest.com/search/pins/?autologin=true&q=${querry}`, {
        headers: {
          cookie:
            '_auth=1; _pinterest_sess=TWc9PSZiNklNR2JnRCtMMzErOXRINzNKSWNDOUxsbHlaMFNqeFNqRjEwOG5lNy9EbGxJVXp4WDdwdDZSM0pzbDdHdmt6Wm5hZEtKcVB6MnhmU2dkb1pkbjRSVHE5YTN2eFM5WmhxTjVoWm9lc2x0WjVHYlI5U0RMMEFZUGJPdzhHRnRyUFBWblNNMUwrUFR0Z2VkcXU4RUJzdllUUHFiZWJXVk5tZ2NzRHV1UkdIVStSZGx4cHRValhyMmRzMW84Qk9XSkhsOGV2RGduMDRGcXJzZWZvVFYxalY0b2lsZ3VaL3NxMU5MMWZZVzlwU3djM1NCMU8zSVpjeUJVaCtmbkxvQ3oycmZwaFVRRU1XWU1CSEZPcG5qY1JiQlVjWWhTakI3emNDc1oxaTJvU2dXSWJUR1gxUUV2VFNWVXhWZ3JwZ2RKZkJxWkVYY0FCanRnczhOSWRFMWRFTkYxUk1lcU1DSGJlL014ZjREaVN4WVE0bW1FV0I2bGtvWGF1N3doamxjV3o4elNVdUJMNHhzaEtXU3dJbHdpZTRnPT0mZnBwVklSME8xV1djN0Y2dVk1OVNXM2J6Z3BFPQ==; __Secure-s_a=WThPejZyLzhaTExNS09lN1BBczRkVStIOGR3T1cvQmJXNXNzV25SaEdQekxqYWhUSFhYWjdHUWFPaWRuditRbDBUZDlvcTdCblpqNVJnR0lVb0xMc3IwaE1PVjM2bEZ3eUZJTi9vcVViSFVOMms5QTIxVVJob1UxTUlYL2k2a3B6bjBMNjNyNm82RnVlWXZIUmFSbXFGbmtWYmdJNEdlVjNUQ1BNVG50NHcyditxZFZybllOTEQ0MFVEOVgwbk42R2xkRVNJYUlUMnRuYlNRcnMyZC9nVTF0T3lBbmdibml3KzQ4THAwMXRyTFpmVTZYQ3ZpeFdqSWtRTDV4NGdzSng4bnpiRy9Vb213T1hXWE1OU2I1OWo2V2FCUGF6eTQ4MnFFS0FGR2JvOE09JlYrRjYrb2p4eThIR0VYWGRMenVFcklTdGhCST0=; _b="AXz4PsLRbdZLt7Ulr9AHauwaJ7aOSTab1B1e/E50kloftjHAeMskPN2r9x6ixSu1yTk="; csrftoken=ce68afde59645de320982b3dc972e277; _pinterest_referrer=https://www.google.com/; _routing_id="8d244246-bd2c-4b35-bac4-0396b05908b9"; sessionFunnelEventLogged=1',
        },
      })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = [];
        const images = [];

        $('div > a')
          .get()
          .map(b => {
            const link = $(b).find('img').attr('src');
            result.push(link);
          });

        result.forEach(image => {
          if (image !== undefined) images.push(image.replace(/236/g, '736'));
        });
        images.shift();
        resolve(images);
      });
  });
}
