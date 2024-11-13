/** @format */

import express from 'express';
import fs from 'fs';
import { join } from 'path';
import axios from 'axios';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';
import * as sc from '../../scrape/index.js';

const apiR = express.Router();

apiR.get('/:fetishburg', apiKeyMiddleware, async (req, res, next) => {
  try {
    const { fetishburg } = req.params;
    const data = await sc.fetishburg(fetishburg);
    res.json({
      status: 'success',
      code: 200,
      data,
    });
  } catch (error) {
    console.error(`Error in handling '/:fetishburg' endpoint:`, error);
    res.status(500).json({
      status: 'Error',
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

export default apiR;
