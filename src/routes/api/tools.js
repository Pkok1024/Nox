/** @format */

import express from 'express';
import * as sc from '../../scrape/index.js';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';
import userAgents from 'user-agents';

const router = express.Router();

const successResponse = (res, code, data, type) => {
  res.setHeader('Content-Type', type);
  if (type === 'application/json') {
    res.json({
      status: 'Success',
      code,
      author,
      data,
    });
  } else {
    res.send(data);
  }
};

const errorResponse = (res, code, error) => {
  res.status(code).json({
    error: error,
  });
};

router.get('/:feature', apiKeyMiddleware, async (req, res) => {
  try {
    const { feature } = req.params;
    const params = req.query;

    let data;

    switch (feature) {
      case 'translate':
        if (!params.lang || !params.text) {
          return errorResponse(
            res,
            400,
            'Invalid parameters. Both lang and text are required.'
          );
        }
        data = await sc.translate(params.lang, params.text);
        successResponse(res, 200, data, 'application/json');
        break;

      case 'cuaca':
        if (!params.kota) {
          return errorResponse(res, 400, 'Invalid parameters.');
        }
        data = await sc.cuaca(params.kota);
        successResponse(res, 200, data, 'application/json');
        break;

      case 'saucenao':
        if (!params.url) {
          return errorResponse(res, 400, 'Invalid parameters.');
        }
        data = await sc.saucenao(params.url);
        successResponse(res, 200, data, 'application/json');
        break;

      case 'styletext':
        if (!params.q) {
          return errorResponse(res, 400, 'Invalid parameters.');
        }
        data = await sc.styleText(params.q);
        successResponse(res, 200, data, 'application/json');
        break;

      case 'removebg':
        if (!params.url) {
          return errorResponse(res, 400, 'Invalid parameters.');
        }
        const imageData = await sc.removeBg(params.url);
        successResponse(res, 200, imageData, 'image/jpeg');
        break;

      case 'ssweb':
        if (!params.url) {
          return errorResponse(res, 400, 'Invalid parameters.');
        }
        const imageSs = await sc.ssweb(params.url);
        successResponse(res, 200, imageSs, 'image/jpeg');
        break;

      case 'sinonim':
        if (!params.kata) {
          return errorResponse(res, 400, 'Invalid parameters.');
        }
        data = await sc.sinonim(params.kata);
        successResponse(res, 200, data, 'application/json');
        break;

      case 'apkmsearch':
        if (!params.query) {
          return errorResponse(res, 400, 'Invalid parameters.');
        }
        data = await sc.apkmS(params.query);
        successResponse(res, 200, data, 'application/json');
        break;

      case 'githubstalk':
        if (!params.username) {
          return errorResponse(res, 400, 'Invalid parameters.');
        }
        data = await sc.gstalk(params.username);
        successResponse(res, 200, data, 'application/json');
        break;

      case 'langList':
        data = await sc.langList();
        successResponse(res, 200, data, 'application/json');
        break;

      case 'userAgents':
        data = JSON.stringify(new userAgents().data);
        successResponse(res, 200, data, 'application/json');
        break;

      case 'anti-porn':
        if (!params.url) {
          return errorResponse(res, 400, 'Parameter url tidak ditemukan');
        }
        data = await sc.cekGambar(params.url);
        successResponse(res, 200, data, 'application/json');
        break;

      default:
        return errorResponse(res, 404, 'Invalid feature.');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal server error.');
  }
});

export default router;
