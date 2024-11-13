/** @format */

import express from 'express';
import fs from 'fs';
import axios from 'axios';
import { join } from 'path';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';
import { pickRandom } from '../../lib/function.js';

const apiR = express.Router();

// Mendefinisikan root path
const ROOT_PATH = 'src/scrape/data/asupan/image';

const readFileContent = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

const handleGetRequest = async (req, res) => {
  try {
    const { country } = req.params;
    const filePath = join(ROOT_PATH, `${country}.json`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        status: 'Not Found',
        message: 'File not found',
      });
    }

    const data = await readFileContent(filePath);

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(500).json({
        status: 'Internal Server Error',
        message: 'Invalid data format',
      });
    }

    const randomImage = pickRandom(data);
    const response = await axios.get(randomImage, {
      responseType: 'stream', // Memastikan response sebagai stream
    });

    // Mengatur header untuk mengindikasikan jenis konten yang dikirim
    res.setHeader(
      'Content-Type',
      response.headers['content-type'] || 'image/jpeg'
    );

    // Mengalirkan data ke response Express
    response.data
      .pipe(res)
      .on('finish', () => {
        res.status(200); // Menandai response selesai
      })
      .on('error', err => {
        console.error('Stream error:', err.message);
        res.status(500).json({
          status: 'Internal Server Error',
          message: 'Error streaming image',
        });
      });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      status: 'Internal Server Error',
      message: error.message,
    });
  }
};

apiR.get('/:country', apiKeyMiddleware, handleGetRequest);

export default apiR;
