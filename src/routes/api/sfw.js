/** @format */

import express from 'express';
import fs from 'fs';
import { join } from 'path';
import axios from 'axios';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';

const apiR = express.Router();

const dataDir = join(process.cwd(), '/src/scrape/data/sfw');

apiR.get('/:sfw', apiKeyMiddleware, async (req, res, next) => {
  try {
    const { sfw } = req.params;
    const filePath = join(dataDir, `${sfw}.json`);
    const data = JSON.parse(fs.readFileSync(filePath));
    const result = data[Math.floor(Math.random() * data.length)];
    const response = await axios.get(result, {
      responseType: 'stream',
    });
    res.setHeader('Content-Type', 'image/jpeg');
    response.data.pipe(res);
  } catch (error) {
    console.error(`Error in handling '/:sfw' endpoint:`, error);
    res.status(500).json({
      status: 'Error',
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

export default apiR;
