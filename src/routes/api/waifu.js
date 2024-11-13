/** @format */

import express from 'express';
import axios from 'axios';

const app = express.Router();

const categories = [
  'waifu',
  'neko',
  'shinobu',
  'megumin',
  'bully',
  'cuddle',
  'cry',
  'hug',
  'awoo',
  'kiss',
  'lick',
  'pat',
  'smug',
  'bonk',
  'yeet',
  'blush',
  'smile',
  'wave',
  'highfive',
  'handhold',
  'nom',
  'bite',
  'glomp',
  'slap',
  'kill',
  'kick',
  'happy',
  'wink',
  'poke',
  'dance',
  'cringe',
];
const nsfwCategories = ['waifu', 'neko', 'trap', 'blowjob'];

async function getWaifuImage(type, category) {
  try {
    const response = await axios.get(
      `https://api.waifu.pics/${type}/${category}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Gagal mengambil gambar waifu dari kategori ${category}: ${error.message}`
    );
  }
}

async function sendJSONResponse(res, data) {
  res.json({
    status: 'Success',
    code: 200,
    data,
  });
}

app.get('/:type', async (req, res) => {
  const { type } = req.params;
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ error: 'Harap berikan kategori.' });
  }

  try {
    const availableCategories = type === 'nsfw' ? nsfwCategories : categories;

    if (!availableCategories.includes(category)) {
      return res.status(400).json({ error: 'Kategori tidak valid.' });
    }

    const data = await getWaifuImage(type, category);
    await sendJSONResponse(res, data.url);
  } catch (error) {
    console.error('Gagal mengambil gambar waifu:', error.message);
    res.status(500).json({ error: 'Gagal mengambil gambar waifu.' });
  }
});

export default app;
