/** @format */
import * as sc from '../../scrape/index.js';
import express from 'express';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';
import fetch from 'node-fetch';
import {
  shortenWithIsGd,
  shortenWithVgd,
  VURL,
  shorter,
} from '../../lib/shorteners.js';

const apiR = express.Router();

const shorteners = {
  isgd: shortenWithIsGd,
  vgd: shortenWithVgd,
  tiny: sc.shortlink,
  vurl: VURL,
  shrt: shorter,
};

apiR.get('/:shortener', apiKeyMiddleware, async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        error: 'URL is required.',
      });
    }

    const shortener = shorteners[req.params.shortener];

    if (!shortener) {
      return res.status(400).json({
        error: 'Invalid shortener specified.',
      });
    }

    const data = await shortener(url);

    if (!data) {
      return res.status(400).json({
        error: 'Invalid response.',
      });
    }
    res.json({
      status: 'Success',
      code: 200,
      author,
      data,
    });
  } catch (error) {
    console.error(error);
  }
});

export default apiR;
