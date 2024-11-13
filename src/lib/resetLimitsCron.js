/** @format */

import cron from 'node-cron';
import User from '../models/user.js';

// Fungsi untuk mengatur cron job yang mereset limit pengguna setiap hari
async function resetLimitsCron() {
  // Jadwalkan pekerjaan cron untuk berjalan setiap hari pada tengah malam (00:00)
  cron.schedule('0 0 * * *', async () => {
    try {
      // Mengupdate semua dokumen pengguna untuk mereset limit ke 120
      await User.updateMany(
        {},
        {
          $set: {
            limit: 120, // Reset limit menjadi 120
          },
        }
      );

      console.log('Batas kunci API berhasil direset.');
    } catch (error) {
      console.error('Kesalahan saat mereset batas kunci API:', error);
    }
  });
}

export default resetLimitsCron;
