/** @format */
// experimental path
import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
import fs from 'fs';
import crypto from 'crypto';
import fetch from 'node-fetch';
import axios from 'axios';
import * as sc from '../../scrape/index.js';
import User from '../../models/user.js';
import apiKeyMiddleware from '../../middlewares/apiKeyMiddleware.js';

const apiR = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const mappingsFile = path.join(__dirname, '../../uploads/mappings.json');

if (!fs.existsSync(mappingsFile)) {
  fs.writeFileSync(mappingsFile, JSON.stringify({}));
}

apiR.post('/cdn', apiKeyMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { buffer, originalname } = req.file;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const uniqueKey = generateUniqueKey(7);

    const mappings = JSON.parse(fs.readFileSync(mappingsFile, 'utf-8'));

    while (mappings[uniqueKey]) {
      uniqueKey = generateUniqueKey(7);
    }

    const discordResult = await sc.discord(buffer, originalname, ip);

    const cleanedUrls = discordResult.map(url =>
      url.replace(
        /https:\/\/cdn\.discordapp\.com\/attachments\/1180706581239832667/,
        ''
      )
    );

    mappings[uniqueKey] = cleanedUrls;

    fs.writeFileSync(mappingsFile, JSON.stringify(mappings));

    const protocol = req.protocol;
    const host = req.get('host');
    const downloadUrl = `${protocol}://${host}/upload/d/${uniqueKey}`;

    res.json({
      status: 'Success',
      code: 200,
      author,
      data: downloadUrl,
    });
  } catch (error) {
    console.error('Error processing file upload:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while processing the file upload.',
    });
  }
});

apiR.get('/d/:key', async (req, res) => {
  try {
    const { key } = req.params;

    const mappings = JSON.parse(fs.readFileSync(mappingsFile, 'utf-8'));

    if (!mappings[key]) {
      console.log(`Key not found: ${key}`);
      return res.status(404).json({
        error: 'Not Found',
        message: 'File not found.',
      });
    }

    const discordFileUrl =
      'https://cdn.discordapp.com/attachments/1180706581239832667' +
      mappings[key];
    console.log(`${discordFileUrl}`);

    const response = await axios({
      url: discordFileUrl,
      method: 'GET',
      responseType: 'stream',
    });

    if (response.status !== 200) {
      throw new Error(
        `Failed to download file from Discord: ${response.statusText}`
      );
    }

    const contentType = response.headers['content-type'];
    res.setHeader('Content-Type', contentType);

    response.data.pipe(res);
  } catch (error) {
    console.error('Error processing file download:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while processing the file download.',
    });
  }
});

function generateUniqueKey(length) {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789=-';
  let key = '';
  for (let i = 0; i < length - 1; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    key += chars[randomIndex];
  }
  return key;
}

// optional, only for crazy people
// function generateUniqueKey(length) {
// const emojis = [
// '\u{1F600}', '\u{1F601}', '\u{1F602}', '\u{1F603}', '\u{1F604}', '\u{1F605}', '\u{1F606}', '\u{1F609}', '\u{1F60A}', '\u{1F60B}',
// '\u{1F60C}', '\u{1F60D}', '\u{1F60E}', '\u{1F60F}', '\u{1F610}', '\u{1F611}', '\u{1F612}', '\u{1F613}', '\u{1F614}', '\u{1F615}',
// '\u{1F616}', '\u{1F617}', '\u{1F618}', '\u{1F619}', '\u{1F61A}', '\u{1F61B}', '\u{1F61C}', '\u{1F61D}', '\u{1F61E}', '\u{1F61F}',
// '\u{1F620}', '\u{1F621}', '\u{1F622}', '\u{1F623}', '\u{1F624}', '\u{1F625}', '\u{1F626}', '\u{1F627}', '\u{1F628}', '\u{1F629}',
// '\u{1F62A}', '\u{1F62B}', '\u{1F62C}', '\u{1F62D}', '\u{1F62E}', '\u{1F62F}', '\u{1F630}', '\u{1F631}', '\u{1F632}', '\u{1F633}',
// '\u{1F634}', '\u{1F635}', '\u{1F636}', '\u{1F637}', '\u{1F638}', '\u{1F639}', '\u{1F63A}', '\u{1F63B}', '\u{1F63C}', '\u{1F63D}',
// '\u{1F63E}', '\u{1F63F}', '\u{1F640}', '\u{1F641}', '\u{1F642}', '\u{1F643}', '\u{1F644}', '\u{1F648}', '\u{1F649}', '\u{1F64A}',
// '\u{1F64B}', '\u{1F64C}', '\u{1F64D}', '\u{1F64E}', '\u{1F64F}'
// ];

// let key = '';
// for (let i = 0; i < length; i++) {
// const randomIndex = Math.floor(Math.random() * emojis.length);
// key += emojis[randomIndex];
// }
// return key;
// }

export default apiR;
