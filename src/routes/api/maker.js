/** @format */

import { getBuffer } from '../../lib/function.js';
import express from 'express';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';
import * as sc from '../../scrape/index.js';

const apiR = express.Router();

apiR.get('/anime', apiKeyMiddleware, async (req, res, next) => {
  try {
    const { url } = req.query;
    const result = await getBuffer(url);
    const data = await sc.toAnime(result);
    res.type('image/jpeg').send(data);
  } catch (error) {}
});

export default apiR;
