/** @format */

import axios from 'axios';
import fs from 'fs';

export default async function coomer(username) {
  const outputPath = `${username}.json`;
  let maxO = 0;
  let result;
  try {
    if (fs.existsSync(outputPath)) {
      const lah = fs.readFileSync(outputPath, 'utf-8');
      return (result = JSON.parse(lah));
    }
    const allAttachments = [];

    while (true) {
      const response = await axios.get(
        `https://coomer.su/api/v1/onlyfans/user/${username}?o=${maxO}`
      );

      const data = response.data;

      const nonEmptyData = data.filter(
        item => item.attachments && item.attachments.length > 0
      );

      if (nonEmptyData.length > 0) {
        const attachments = nonEmptyData.flatMap(item =>
          item.attachments.map(
            attachment => 'https://coomer.su/' + attachment.path
          )
        );

        allAttachments.push(...attachments);
        maxO += 50;
      } else {
        console.log(`Tidak ada data valid untuk o=${maxO}`);
        break;
      }
    }

    result = allAttachments;

    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');

    console.log(
      `Hasil berhasil disimpan di ${outputPath} total ${result.length}`
    );

    return result;
  } catch (error) {
    console.error('Gagal mengambil data coomer:', error.message);
    throw error;
  }
}
