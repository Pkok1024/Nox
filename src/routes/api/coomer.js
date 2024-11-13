/** @format */

import express from 'express';
import axios from 'axios';
import * as sc from '../../scrape/index.js';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';
import { pickRandom } from '../../lib/function.js';
const apiR = express.Router();

const getRandomImage = async url => {
  try {
    const response = await axios.get(url, {
      responseType: 'stream',
    });
    return response.data;
  } catch (error) {
    throw new Error('Error getting the image stream');
  }
};

apiR.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const result = await sc.coomer(username);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No images found for this user' });
    }

    const random = pickRandom(result);
    const imageStream = await getRandomImage(random);

    res.setHeader('Content-Type', 'image/jpeg');
    imageStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default apiR;
