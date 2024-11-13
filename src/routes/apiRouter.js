/** @format */

import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const apiRouter = express.Router();

// Aktifkan CORS secara global
apiRouter.use(cors());
apiRouter.use(express.urlencoded({ extended: true }));
apiRouter.use(express.json());

const importRoutes = async routeModule => {
  try {
    const { default: routeHandler } = await import(`./api/${routeModule}`);
    if (typeof routeHandler === 'function') {
      apiRouter.use(`/${routeModule.replace('.js', '')}`, routeHandler);
    } else {
      console.error(
        `Tidak ditemukan fungsi default yang valid di ${routeModule}`
      );
    }
  } catch (error) {
    console.error(`Kesalahan saat mengimpor rute dari ${routeModule}:`, error);
  }
};

(async () => {
  try {
    const routeFiles = await fs.readdir(path.resolve(__dirname, 'api'));
    const routeModules = routeFiles.filter(
      file => file.endsWith('.js') && file !== 'router.js'
    );

    // Menambahkan penanganan kesalahan untuk impor yang gagal
    await Promise.all(
      routeModules.map(module =>
        importRoutes(module).catch(err =>
          console.error(`Gagal mengimpor ${module}:`, err)
        )
      )
    );
  } catch (error) {
    console.error('Kesalahan saat membaca modul rute:', error);
    // Menambahkan rute fallback jika terjadi kesalahan kritis
    apiRouter.use('*', (req, res) => {
      res.status(500).json({ message: 'Kesalahan Internal Server' });
    });
  }
})();

export default apiRouter;

// Untuk produksi, hapus penanganan kesalahan fallback ini
// dan sesuaikan mekanisme logging untuk skala besar
