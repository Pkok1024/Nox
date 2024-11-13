/** @format */

import FormData from 'form-data';
import axios from 'axios';

export default async function upload(buffer, filename, ip = '') {
  const webhooks = [
    'https://discord.com/api/webhooks/1180707117452247080/ynvl7bhzh7MbsXwvwfMbxCzdAVyzOdO-t-BSvbpjxkMKYrz_pFbZas4uoi8wruqLPPSI',
  ];

  const CHUNK_SIZE = 8 * 1024 * 1024;
  let uploadingCount = 0;
  let LC = 0;

  async function getRandomWebhook() {
    if (webhooks.length === 0) {
      throw new Error('Daftar webhook kosong.');
    }

    const randomIndex = Math.floor(Math.random() * webhooks.length);
    const webhook = webhooks[randomIndex];
    const W = webhook.match(/discord.com\/api\/webhooks\/([^\/]+)\/([^\/]+)/);
    return `https://discordapp.com/api/webhooks/${W[1]}/${W[2]}`;
  }

  async function toUrl(buffer, filename) {
    const chunks = splitBuffer(buffer, CHUNK_SIZE);
    const urls = [];
    LC += buffer.length;
    for (const chunk of chunks) {
      const url = await uploadChunk(chunk, filename);
      urls.push(url);
    }
    return urls;
  }

  async function uploadChunk(chunk, filename) {
    const formData = new FormData();
    formData.append('files[0]', chunk, {
      filename,
    });
    const content = `\`\`\`\nIp User: ${ip}\nFile Name: ${filename}\nFile Size: ${metricNumbers(chunk.length)}(${chunk.length})\nChunk Count: ${uploadingCount}\nChunk Size File: ${LC}\`\`\``;
    formData.append(
      'payload_json',
      JSON.stringify({
        content,
      })
    );

    const url = await getRandomWebhook();
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    await wait(uploadingCount++ * 1000);

    const result = (
      await axios
        .post(url, formData, {
          headers,
        })
        .catch(async err => {
          // Auto retry if the request is rate limited recursively
          await wait(+err.response.headers['x-ratelimit-reset-after']);
          return {
            data: {
              attachments: [
                {
                  url: await uploadChunk(chunk, filename),
                },
              ],
            },
          };
        })
        .finally(() => uploadingCount--)
    ).data;
    if (!result?.attachments?.[0]?.url) {
      throw new Error('Cannot find attachments when uploading');
    }
    return result.attachments[0].url;
  }

  function splitBuffer(buffer, size) {
    const chunks = [];
    let offset = 0;
    while (offset < buffer.length) {
      const chunkSize = Math.min(size, buffer.length - offset);
      chunks.push(buffer.slice(offset, offset + chunkSize));
      offset += chunkSize;
    }
    return chunks;
  }

  async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function metricNumbers(value) {
    const types = ['', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const selectType = (Math.log10(value) / 3) | 0;
    if (selectType == 0) return value;
    let scaled = value / Math.pow(10, selectType * 3);
    return scaled.toFixed(1) + types[selectType];
  }

  return await toUrl(buffer, filename);
}
