/** @format */

import axios from 'axios';

async function getLink(payload) {
  try {
    const response = await axios.post(
      'https://terabox-dl.qtcloud.workers.dev/api/get-download',
      payload
    );
    return response.data.downloadLink;
  } catch (error) {
    return error.response.data;
  }
}

export default async function terabox(url) {
  let fileId = (url.split(/surl=|\/s\//) || [])[1];
  fileId = `1${fileId.replace(/^1/, '')}`;
  const infoResponse = await axios.get(
    `https://terabox-dl.qtcloud.workers.dev/api/get-info?shorturl=${fileId}`
  );
  const fileInfo = infoResponse.data;

  if (fileInfo.ok !== true) {
    throw new Error(fileInfo.message);
  }

  for (const file of fileInfo.list) {
    const payload = {
      shareId: fileInfo.shareId,
      uk: fileInfo.uk,
      sign: fileInfo.sign,
      timestamp: fileInfo.timestamp,
      fsId: file.children.length ? file.children[0].fs_id : file.fs_id,
    };

    const downloadUrl = await getLink(payload);

    file.downloadLink = downloadUrl;
  }

  return fileInfo;
}
