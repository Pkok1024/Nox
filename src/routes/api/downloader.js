/** @format */

import express from 'express';
import { fetchJson } from '../../lib/function.js';
import * as sc from '../../scrape/index.js';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';

const apiR = express.Router();
const errorResponse = (res, code, message) => {
  res.status(code).json({
    error: message,
  });
};

const successResponse = (res, code, data) => {
  res.json({
    status: 'Success',
    code,
    author,
    data,
  });
};

apiR.get('/:source', apiKeyMiddleware, async (req, res) => {
  const url = req.query.url;
  if (!url) return errorResponse(res, 400, 'Parameter url tidak ditemukan');

  let data;

  switch (req.params.source.toLowerCase()) {
    case 'tiktok':
      data = await (
        await fetchJson(
          `https://xorizn-downloads.vercel.app/api/downloads/tiktok?url=${url}`
        )
      ).result;
      break;
    case 'mediafire':
      data = await sc.mediafire(url);
      break;
    case 'facebook':
      data = await sc.facebook(url);
      break;
    case 'terabox':
      data = await (await sc.terabox(url)).list;
      break;
    case 'instagram':
    case 'igstory':
    case 'igtv':
      data = await sc.snapSave(url);
      break;
    case 'igstory2':
      data = await sc.igStory(url);
      break;
    case 'ttslide':
      data = await sc.ttSlide(url);
      break;
    case 'twitter':
      data = await sc.twitterDl(url);
      break;
    case 'capcut':
      data = await sc.capcutDl(url);
      break;
    case 'spotify':
      data = await sc.spotifyDl(url);
      break;
    case 'sfile':
      data = await sc.sfileDl(url);
      break;
    case 'dvadownloader':
      data = await sc.scrapeAppUrl(url);
      break;
    case 'gdrive':
      data = await sc.GDriveDl(url);
      break;
    case 'apkmirror':
      data = await sc.apkmD(url);
      break;
    case 'xnxx':
      data = await sc.xnxxDownloader(url);
      break;
    default:
      return errorResponse(res, 400, 'Features not found');
  }

  if (!data) return errorResponse(res, 400, 'Tidak ada data yang ditemukan');

  successResponse(res, 200, data);
});

export default apiR;
