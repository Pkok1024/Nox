/** @format */

import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import redoc from 'redoc-express';
//===========<import file>===========//
import resetLimitsCron from './lib/resetLimitsCron.js';
import customLogger from './lib/logger.js';
import apiRouter from './routes/apiRouter.js';
import authRoutes from './routes/authRoutes.js';
import docsRouter from './routes/docsRouter.js';
import verifyRoutes from './routes/verifyRoutes.js';
import errorHandler from './views/error.js';
import homeRouter from './views/home.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
// Initialize cron job for resetting limits
resetLimitsCron();

// Middleware for development logging
if (process.env.NODE_ENV === 'development') {
  app.use(customLogger);
}




app.get(
  '/redocs',
  (req, res, next) => {
    // Middleware untuk menangani error
    res.on('finish', () => {
      if (res.statusCode !== 200) {
        console.error(`Error: ${res.statusCode} - ${req.originalUrl}`);
      }
    });
    next();
  },
  redoc({
    title: '.M.U.F.A.R.',
    specUrl: '/swagger.json', // Pastikan URL ini benar
    nonce: '', // Jika perlu untuk keamanan
    redocOptions: {
      hideDownloadButton: true, // Menyembunyikan tombol unduh
    },
  })
);



// Body parser middleware (using built-in express parsers)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable CORS with options
const corsOptions = {
  origin: 'https://your-domain.com', // Replace with your domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

// Compression middleware
app.use(compression());

// Security middleware with custom helmet configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'script-src': ["'self'", "'unsafe-inline'"],
        'style-src': ["'self'", "'unsafe-inline'"],
      },
    },
    hidePoweredBy: true,
  })
);

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Trust proxy settings
app.set('trust proxy', 1);

// Set JSON response formatting
app.set('json spaces', 2);

// Serve documentation
app.use(docsRouter);

// Define application routes
app.use('/', homeRouter, verifyRoutes, apiRouter, authRoutes);

// Handle 404 errors
app.use(errorHandler);

// Global error handling middleware
// app.use((err, req, res, next) => {
// if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
// return res.status(400).send({ message: 'Invalid JSON payload' })
// }
// console.error(err.stack)
// res
// .status(500)
// .sendFile(
// path.join(__dirname, 'views', 'pages', 'error', '500.html')
// )
// })
// Middleware penanganan error
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ message: 'Invalid JSON payload' });
  }
  console.error(err.stack);
  res
    .status(500)
    .sendFile(path.join(__dirname, 'views', 'pages', 'error', '500.html'));
});
export default app;
