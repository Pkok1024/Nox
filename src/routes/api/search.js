/** @format */

import express from 'express';
import * as sc from '../../scrape/index.js';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';

const apiR = express.Router();

const successResponse = (res, code, data) => {
  res.json({
    status: 'Success',
    code,
    data,
  });
};

const errorResponse = (res, code, message) => {
  res.status(code).json({
    error: message,
  });
};

const checkQueryParam = (param, res) => {
  if (!param.q) {
    errorResponse(res, 400, 'Query parameter "q" is required.');
    return true;
  }
  return false;
};

apiR.get('/xvideos', apiKeyMiddleware, async (req, res) => {
  try {
    const { query, short, date, duration, quality, page } = req.query;
    const videos = await sc.xvideoS(
      query,
      short,
      date,
      duration,
      quality,
      page
    );
    successResponse(res, 200, videos);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
});

apiR.get('/:feature', apiKeyMiddleware, async (req, res, next) => {
  const { feature } = req.params;
  const param = req.query;
  if (checkQueryParam(param, res)) return; // Cek parameter q terlebih dahulu

  let data;
  try {
    switch (feature) {
      case 'youtube':
        data = await sc.youtube(param.q);
        break;
      case 'xnxx':
        data = await sc.xnxxSearch(param.q);
        break;
      case 'dvasearch':
        data = await sc.scrapeGameData(param.q);
        break;
      case 'komikcast':
        data = await sc.KomikCast(param.q);
        break;
      case 'wikipedia':
        data = await sc.wikipedia(param.q);
        break;
      case 'bukalapak':
        data = await sc.bukalapak(param.q);
        break;
      case 'tiktoks':
        data = await sc.tiktoks(param.q);
        break;
      default:
        return errorResponse(res, 404, 'Invalid feature.');
    }
    successResponse(res, 200, data);
  } catch (error) {
    console.error(`Error in feature ${feature}:`, error);
    errorResponse(res, 500, 'Failed to fetch data');
    next(error); // Passing the error to the next middleware (if needed)
  }
});

export default apiR;
