/** @format */

import express from 'express';
import * as sc from '../../scrape/index.js';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';

const apiR = express.Router();
// console.log(sc);
apiR.use(apiKeyMiddleware);

apiR.get('/:route', async (req, res) => {
  try {
    switch (req.params.route) {
      case 'doujin-search':
        if (!req.query.q) {
          return res.status(400).json({
            error: 'Parameter tidak valid. q diperlukan.',
          });
        }
        return res.json(await sc.doujindesusearch(req.query.q));
      case 'doujin-ch':
        if (!req.query.url) {
          return res.status(400).json({
            error: 'Parameter tidak valid. url diperlukan.',
          });
        }
        return res.json(await sc.doujindesuch(req.query.url));
      case 'doujin-img':
        if (!req.query.url) {
          return res.status(400).json({
            error: 'Parameter tidak valid. url diperlukan.',
          });
        }
        return res.json(await sc.dojindsgetimg(req.query.url));
      // interface ada di bagian tools bukan di anime
      case 'komikindo-ch':
        if (!req.query.url) {
          return res.status(400).json({
            error: 'Parameter tidak valid. url diperlukan.',
          });
        }
        return res.json(await sc.komikindogetch(req.query.url));
      case 'doujin-latest':
        return res.json(await sc.doujindesulatest());
      case 'hentai':
        return res.json(await sc.hentai());
      case 'whatanime':
        if (!req.query.url) {
          return res.status(400).json({
            error: 'Parameter tidak valid. url diperlukan.',
          });
        }
        return res.json(await sc.traceMoe(req.query.url));
      case 'nhentai-search':
        if (!req.query.q) {
          return res.status(400).json({
            error: 'Parameter tidak valid. q diperlukan.',
          });
        }
        return res.json(await sc.nhentaisearch(req.query.q));
      default:
        return res.status(404).json({
          error: 'Route tidak ditemukan.',
        });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Terjadi kesalahan internal server.',
    });
  }
});

export default apiR;
