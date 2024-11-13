/** @format */

import express from 'express';
import axios from 'axios';

const apiR = express.Router();

// Function to fetch image URL based on tag
async function fetchImageUrl(tag) {
  try {
    const response = await axios.get(
      `https://api.waifu.im/search?included_tags=${tag}`
    );
    return response.data.images[0].url;
  } catch (error) {
    console.error(`Error fetching image URL for tag ${tag}:`, error);
    throw new Error('Failed to fetch image URL');
  }
}

async function downloadImage(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(response.data, 'binary');
  } catch (error) {
    console.error('Error downloading image:', error);
    throw new Error('Failed to download image');
  }
}

apiR.get('/:tag', async (req, res) => {
  const { tag } = req.params;
  try {
    const imageUrl = await fetchImageUrl(tag);

    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
    });

    const response = await axios.get(imageUrl, {
      responseType: 'stream',
    });
    response.data.pipe(res);
  } catch (error) {
    console.error(`Error processing request for tag ${tag}:`, error.message);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred while processing the request.',
    });
  }
});

export default apiR;
